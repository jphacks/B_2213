import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../pages/_app";
import styles from "../../../../styles/Home.module.css";
import { ActionInfoType, ShowActionProps } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import BetChips from "../../modules/forms/game/BetChips";
import SendAndCancelAction from "../../modules/forms/game/SendAndCancelAction";
import ActionButtons from "../../modules/select/game/ActionButtons";
import { UIControllContext } from "../../templates/game/GameController";

const ActionSelect = () => {
  const { userInfo } = useContext(UserContext);
  const { showAction, setShowAction } = useContext(UIControllContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users[userInfo.userID!].bettingTips;
  const stack = gameInfo.users[userInfo.userID!].stack;

  const [actionInfo, setActionInfo] = useState<ActionInfoType>({
    canActions: ["call", "raise", "fold"],
    selectedAction: 0,
    willBet: toCall - bettingTips < stack ? toCall - bettingTips : stack,
  });

  useEffect(() => {
    const canActionList = (() => {
      if (toCall == 0) {
        return ["check", "bet", "fold"];
      }
      if (toCall - bettingTips == 0) {
        return ["check", "bet", "fold"];
      }
      return ["call", "raise", "fold"];
    })(); // 即時関数

    setActionInfo({
      ...actionInfo,
      canActions: canActionList,
      willBet: toCall - bettingTips < stack ? toCall - bettingTips : stack,
    });
  }, [toCall, bettingTips, stack]);

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        <ActionButtons {...{ actionInfo, setActionInfo }} />

        <BetChips {...{ actionInfo, setActionInfo }} />

        <SendAndCancelAction {...{ actionInfo, setActionInfo }} />
      </div>
    </div>
  );
};

export default ActionSelect;
