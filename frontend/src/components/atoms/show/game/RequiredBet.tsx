import { useGameInfo } from "../../../hooks/game/useGameInfo";

const RequiredBet = () => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const roomData = gameInfo.roomData;

  return (
    <div>
      <div className="text-center mt-8 py-4 border-2 border-gold rounded-md">
        <h1 className="text-4xl w-full">Required Bet</h1>
        <h1 className="text-3xl pt-2 w-full">{roomData.toCall}</h1>
      </div>
    </div>
  );
};

export default RequiredBet;
