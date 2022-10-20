import { NextPage } from "next";
import ModalBBSB from "../src/components/Organisms/game/ModalBBSB";
import ModalSelectWinner from "../src/components/Organisms/game/ModalSelectWinner";

const Test: NextPage = () => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <ModalSelectWinner />
    </div>
  );
};

export default Test;
