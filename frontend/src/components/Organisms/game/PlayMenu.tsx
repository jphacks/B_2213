import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import { UIControllContext } from "../../templates/game/GameController";

const PlayMenu = () => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const { setShowAction, dataName, setDataName } =
    useContext(UIControllContext);
  const userInfoInGameInfo = gameInfo.users[userInfo.userID!];
  const canAction = userInfoInGameInfo.joining && !userInfoInGameInfo.actioned; // actionすることができるかどうか

  return (
    <div className="text-center pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
      <button
        className={
          "px-6 py-2 mx-3 border-gold-button transition-colors duration-300 transform rounded-md " +
          (canAction ? "opacity-100" : "opacity-20 pointer-events-none") //ボタンイベントを無効化
        }
        onClick={() => setShowAction(true)}
      >
        Action
      </button>

      <button
        className="px-6 py-2 mx-3 bg-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => setDataName(dataName == "bet" ? "stack" : "bet")}
      >
        Change Data
      </button>
    </div>
  );
};

export default PlayMenu;
