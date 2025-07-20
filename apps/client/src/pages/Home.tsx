import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { GraphContext } from "../features/GraphContext";
import "./Home.css";
import Claim from "../components/Claim";
type Claim = {
  id: number;
  text: string;
  supports: number[];
  concludes: number[];
};
type line = {
  key: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const Home = () => {
  const [claims] = useState<Claim[]>([
    // Final conclusion
    { id: 1, text: "Socrates is mortal", supports: [2, 3], concludes: [] },

    // Argument: All men are mortal + Socrates is a man → Socrates is mortal
    { id: 2, text: "All men are mortal", supports: [4, 5], concludes: [1] },
    { id: 3, text: "Socrates is a man", supports: [6, 7], concludes: [1] },

    // Support for "All men are mortal"
    { id: 4, text: "Every known man in history has died", supports: [8, 9], concludes: [2] },
    { id: 5, text: "There are no known exceptions to human mortality", supports: [10, 11], concludes: [2] },

    // Support for "Socrates is a man"
    { id: 6, text: "Historical records identify Socrates as a male human", supports: [12], concludes: [3] },
    { id: 7, text: "Socrates participated in human society in ancient Greece", supports: [13], concludes: [3] },

    // Deeper support (Level 4)
    { id: 8, text: "Historical figures like Aristotle, Plato, and Caesar all died", supports: [14], concludes: [4] },
    { id: 9, text: "Medical science confirms aging leads to death in humans", supports: [15], concludes: [4] },
    { id: 10, text: "Scientific studies have found no immortality gene in humans", supports: [], concludes: [5] },
    { id: 11, text: "No verified case of human immortality exists", supports: [], concludes: [5] },

    // Support for Socrates being identified in records
    { id: 12, text: "Multiple ancient texts refer to Socrates as a man", supports: [], concludes: [6] },
    { id: 13, text: "Socrates was known as a philosopher and citizen of Athens", supports: [], concludes: [7] },

    // Even deeper support (Level 5)
    {
      id: 14,
      text: "Historical documentation includes biographies and records of deaths",
      supports: [16],
      concludes: [8],
    },
    { id: 15, text: "Human cellular aging leads to senescence and death", supports: [17], concludes: [9] },

    // Level 6
    {
      id: 16,
      text: "Books and scrolls from antiquity record the lives and deaths of notable men",
      supports: [],
      concludes: [14],
    },
    { id: 17, text: "Telomere shortening causes cellular death in humans", supports: [], concludes: [15] },
  ]);
  const claimsMap = new Map<number, Claim>();
  claims.forEach((claim) => claimsMap.set(claim.id, claim));

  const [levels, setLevels] = useState<Claim[][]>([]);

  const graphRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<line[]>([]);

  const updateLines = useCallback(() => {
    const newLines: line[] = [];
    levels.forEach((level) => {
      level.forEach((claim) => {
        const lines = claim.supports
          .map((connectedId) => {
            const startRect = document
              .getElementById(`claim-${connectedId}`)
              ?.querySelector(".node.bottom")
              ?.getBoundingClientRect();
            const endRect = document
              .getElementById(`claim-${claim.id}`)
              ?.querySelector(".node.top")
              ?.getBoundingClientRect();
            if (!startRect || !endRect)
              return {
                key: String(Math.random() * 100),
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
              };
            return {
              key: `${connectedId}-to-${claim.id}`,
              x1: startRect.x + startRect.width / 2,
              y1: startRect.y + startRect.height / 2 - 100,
              x2: endRect.x + endRect.width / 2,
              y2: endRect.y + endRect.height / 2 - 100,
            };
          })
          .filter(Boolean);
        newLines.push(...lines);
      });
    });
    setLines(newLines);
  }, [levels]);

  const updateLevels = () => {
    const visited = new Set();
    const newLevels = [];
    let currentLevelKeys = [
      claims.reduce((prev, current) => (current.id < prev.id ? current : prev), { id: Infinity }).id,
    ];
    while (currentLevelKeys.length > 0) {
      const levelObjects = [];
      const nextLevelKeys = [];
      for (const key of currentLevelKeys) {
        if (visited.has(key)) continue;
        visited.add(key);
        const obj = claimsMap.get(key);
        if (!obj) continue;
        levelObjects.push(obj);
        const childKeys = [...(obj.supports || []).map((id) => id), ...(obj.concludes || []).map((id) => id)];
        for (const childKey of childKeys) {
          if (!visited.has(childKey)) {
            nextLevelKeys.push(childKey);
          }
        }
      }
      if (levelObjects.length > 0) newLevels.unshift(levelObjects);
      currentLevelKeys = nextLevelKeys;
    }
    setLevels(newLevels);
  };

  useEffect(() => {
    updateLevels();
  }, []);

  useLayoutEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);
    window.addEventListener("scroll", updateLines, true);
    return () => {
      window.removeEventListener("resize", updateLines);
      window.removeEventListener("scroll", updateLines, true);
    };
  }, [updateLines]);

  return (
    <div id="home">
      <GraphContext.Provider value={graphRef}>
        <svg ref={graphRef} id="graph" xmlns="http://www.w3.org/2000/svg">
          {lines.map((line) => (
            <line key={line.key} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          ))}
        </svg>
        {levels.map((level) => (
          <div className="level" key={level[0].id}>
            {level.map((claim) => (
              <Claim {...claim} key={claim.id} />
            ))}
          </div>
        ))}
      </GraphContext.Provider>
    </div>
  );
};
export default Home;
