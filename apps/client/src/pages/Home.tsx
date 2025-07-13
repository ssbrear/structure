import { useState } from "react";
import "./Home.css";

import Claim from "../components/Claim";

const Home = () => {
  const [levels, setLevels] = useState([
    [
      {
        text: "",
        key: 0,
      },
    ],
  ]);
  const flat = levels.flat(2).map(({ key }) => key);
  const newClaim = (levelIndex: number) => {
    if (levels[levelIndex])
      setLevels([
        ...levels.slice(0, levelIndex),
        [...levels[levelIndex], { text: "", key: flat.length }],
        ...levels.slice(levelIndex + 1),
      ]);
    else setLevels([...levels.slice(0, levelIndex), [{ text: "", key: flat.length }], ...levels.slice(levelIndex + 1)]);
  };
  const renderClaims = () =>
    levels.map((level, index) => (
      <div className="level" key={index}>
        {level.map((claim) => (
          <Claim
            text={claim.text}
            key={claim.key}
            onSupport={() => newClaim(index - 1)}
            onConclude={() => newClaim(index + 1)}
          />
        ))}
      </div>
    ));
  return <div id="home">{renderClaims()}</div>;
};
export default Home;
