import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import GeneralButton from "../../atoms/form/start/GeneralButton";
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
      <GeneralButton
        handleSendButton={() =>
          setDataName(dataName == "bet" ? "stack" : "bet")
        }
        typeName="Change Data"
        css="border-gold-button mx-3"
      />

      <GeneralButton
        handleSendButton={() => setShowAction(true)}
        typeName="Action"
        css={
          "bg-gold-button mx-3 transition-colors " +
          (canAction ? "opacity-100" : "opacity-20 pointer-events-none")
        }
        // ^^^ボタンイベントを無効化
      />
    </div>
  );
};

export default PlayMenu;
