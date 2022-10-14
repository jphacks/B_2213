import { NextPage } from "next";
import SetOption from "../src/components/Organisms/game/SetOption";

const Test: NextPage = () => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <SetOption />
    </div>
  );
};

export default Test;
