import { useState } from "react";
import "./Home.css";

import Claim from "../components/Claim";
type Claim = {
  id: number;
  text: string;
  supports: number[];
  concludes: number[];
};
const sampleClaims: Claim[] = [
  // Root conclusion
  { id: 1, text: "We must urgently address climate change", supports: [2, 3, 4], concludes: [] },

  // First branch (science-based support)
  { id: 2, text: "Climate change is driven by human activity", supports: [5, 6], concludes: [1] },
  { id: 5, text: "CO₂ levels have risen dramatically since the industrial revolution", supports: [], concludes: [2] },
  { id: 6, text: "Human industrial activity correlates with global temperature rise", supports: [], concludes: [2] },

  // Second branch (impact-based support)
  { id: 3, text: "Climate change causes severe global impacts", supports: [7, 8, 9], concludes: [1] },
  { id: 7, text: "Extreme weather events are becoming more frequent", supports: [10], concludes: [3] },
  { id: 10, text: "Data shows a 40% increase in extreme storms over 30 years", supports: [], concludes: [7] },
  { id: 8, text: "Rising sea levels threaten coastal cities", supports: [], concludes: [3] },
  { id: 9, text: "Ecosystems and biodiversity are at risk", supports: [11], concludes: [3] },
  { id: 11, text: "1 million species are threatened with extinction", supports: [], concludes: [9] },

  // Third branch (solutions and action)
  { id: 4, text: "Effective solutions are available", supports: [12, 13, 14], concludes: [1] },
  { id: 12, text: "Transitioning to renewable energy reduces emissions", supports: [15], concludes: [4] },
  { id: 15, text: "Countries using renewables have slowed their emission growth", supports: [], concludes: [12] },
  { id: 13, text: "Climate policies can drive positive change", supports: [16], concludes: [4] },
  { id: 16, text: "The Paris Agreement has united global action", supports: [], concludes: [13] },
  { id: 14, text: "Public awareness is growing, increasing pressure for reform", supports: [17], concludes: [4] },
  { id: 17, text: "Climate protests and media coverage are increasing", supports: [], concludes: [14] },

  // Bonus leaves to hit 20 claims
  { id: 18, text: "Methane emissions are also a major concern", supports: [], concludes: [2] },
  { id: 19, text: "Deforestation reduces natural carbon absorption", supports: [], concludes: [2] },
  { id: 20, text: "Green technology investment is rising", supports: [], concludes: [4] },
];
const claimsMap = new Map<number, Claim>();
sampleClaims.forEach((c) => claimsMap.set(c.id, c));
const Home = () => {
  const [conclusion, setConclusion] = useState<Claim>(sampleClaims[0]);

  const handleConclusionUpdate = (id: number) => {
    if (id === conclusion.id) return;
    const newConclusion: Claim | undefined = claimsMap.get(id);
    if (newConclusion) setConclusion(newConclusion);
  };

  const renderClaim = (claim: Claim) => <Claim {...claim} conclusionUpdate={handleConclusionUpdate} key={claim.id} />;
  const renderClaims = () => {
    const supportingClaims: Claim[] = [];
    conclusion.supports.forEach((id) => {
      const claim = claimsMap.get(id);
      if (claim) supportingClaims.push(claim);
    });
    const concludingClaims: Claim[] = [];
    conclusion.concludes.forEach((id) => {
      const claim = claimsMap.get(id);
      if (claim) concludingClaims.push(claim);
    });
    const levels: Claim[][] = [supportingClaims, [conclusion], concludingClaims].filter((level) => level.length > 0);
    return levels.map((level) => <div className="level">{level.map((claim) => renderClaim(claim))}</div>);
  };
  return <div id="home">{renderClaims()}</div>;
};
export default Home;
