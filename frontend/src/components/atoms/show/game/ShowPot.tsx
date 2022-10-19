import { useGameInfo } from "../../../hooks/game/useGameInfo";

const ShowPot = () => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const roomData = gameInfo.roomData;

  return (
    <div className="text-center mt-8 py-4 border-2 border-gold rounded-md">
      <h1 className="text-4xl w-full">POT</h1>
      <h1 className="text-3xl pt-2 w-full">{roomData.pot}</h1>
    </div>
  );
};

export default ShowPot;
