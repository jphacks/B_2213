import type { SetGameProps } from "../../../../types/game/type";
import SelectTag from "../../../atoms/transition/start/SelectTag";

const GameSelect = ({ setGameType }: SetGameProps) => {
  return (
    <div className="max-w-2xl text-center">
      <div onClick={() => setGameType("poker")}>
        <SelectTag tagName={"poker"} />
      </div>
      <div onClick={() => setGameType("mahjong")}>
        <SelectTag tagName={"mahjong"} />
      </div>
    </div>
  );
};

export default GameSelect;
