import "./Claim.css";

type ClaimProps = {
  text: string;
  id: number;
  supports: number[];
  concludes: number[];
};

const Claim = ({ text, id, supports, concludes }: ClaimProps) => {
  return (
    <div
      id={`claim-${String(id)}`}
      className={`claimContainer ${supports.length ? "supported" : ""} ${concludes.length ? "concludes" : ""}`}
    >
      <span className="node top"></span>
      <span className="node bottom"></span>
      <div className="claim">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Claim;
