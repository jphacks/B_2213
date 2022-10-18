import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import { ShowActionProps } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";

const PlayMenu = ({ setShowAction }: ShowActionProps) => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const userInfoInGameInfo = gameInfo.users[userInfo.userID!];
  const canAction = userInfoInGameInfo.joining && !userInfoInGameInfo.actioned; // actionすることができるかどうか

  const handleActionButton = () => {
    if (!canAction) {
      return;
    }
    setShowAction(true);
  };

  return (
    <div className="pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
      <button
        className={
          "px-6 py-2 mx-3 border-gold-button transition-colors duration-300 transform rounded-md " +
          (canAction ? "opacity-100" : "opacity-20 pointer-events-none") //hoverなどを無効化
        }
        onClick={() => handleActionButton()}
      >
        Action
      </button>

      <button className="px-6 py-2 mx-3 bg-gold-button transition-colors duration-300 transform rounded-md">
        Change Data
      </button>
    </div>
  );
};

export default PlayMenu;
