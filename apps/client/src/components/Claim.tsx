import { useState } from "react";
import "./Claim.css";

type ClaimProps = {
  text: string;
  onSupport: () => void;
  onConclude: () => void;
};

const Claim = ({ text, onSupport, onConclude }: ClaimProps) => {
  const [claim, setClaim] = useState(text);
  return (
    <>
      <div className="claim">
        <button onClick={onSupport}>+</button>
        <input value={claim} onChange={(e) => setClaim(e.target.value)} />
        <button onClick={onConclude}>+</button>
      </div>
    </>
  );
};

export default Claim;
