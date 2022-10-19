import { useContext } from "react";
import MemberBet from "../../atoms/show/game/MemberBet";
import MemberStack from "../../atoms/show/game/MemberStack";
import RequiredBet from "../../atoms/show/game/RequiredBet";
import ShowPot from "../../atoms/show/game/ShowPot";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import { UIControllContext } from "../../templates/game/GameController";

const GameData = () => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const roomData = gameInfo.roomData;
  const { dataName } = useContext(UIControllContext);

  return (
    <div>
      <h1 className="text-4xl pt-8 pb-1 w-full">Stage : {roomData.stage}</h1>
      {dataName == "bet" ? (
        <div>
          <RequiredBet />
          <MemberBet />
        </div>
      ) : (
        <div>
          <ShowPot />
          <MemberStack />
        </div>
      )}
    </div>
  );
};

export default GameData;
