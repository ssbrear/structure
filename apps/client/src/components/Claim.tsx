// import { useState } from "react";
import "./Claim.css";

type ClaimProps = {
  text: string;
  id: number;
  supports: number[];
  concludes: number[];
  conclusionUpdate: (id: number) => void;
};

const Claim = ({ text, id, supports, concludes, conclusionUpdate }: ClaimProps) => {
  return (
    <>
      <div className={`claimContainer ${supports.length ? "supported" : ""} ${concludes.length ? "concludes" : ""}`}>
        <button>+</button>
        <div className="claim" onClick={() => conclusionUpdate(id)}>
          <p>{text}</p>
          {/* <input value={claim} onChange={(e) => setClaim(e.target.value)} /> */}
        </div>
        <button>+</button>
      </div>
    </>
  );
};

export default Claim;
