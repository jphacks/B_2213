import { useState } from "react";
import styles from "../../../../styles/Home.module.css";
import { ActionInfoType } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import BetChips from "../../modules/forms/game/BetChips";
import ActionButtons from "../../modules/select/game/ActionButtons";

type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};

const ActionSelect = ({ showAction, setShowAction }: ShowActionProps) => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users["Uasdfas"].bettingTips; // useIDに自分のを入れるように今後する
  const stack = gameInfo.users["Uasdfas"].stack; // useIDに自分のを入れるように今後する

  const [actionInfo, setActionInfo] = useState<ActionInfoType>({
    canActions: ["check", "bet", "fold"],
    selectedAction: 0,
    willBet: toCall - bettingTips < stack ? toCall - bettingTips : stack,
  });

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        {/* maxbetやallchipsはuseContextで渡す */}
        <ActionButtons {...{ actionInfo, setActionInfo }} />

        <BetChips {...{ actionInfo, setActionInfo }} />

        <div className="mt-10">
          <button
            className="px-6 py-2 mr-10 border-gold-button transition-colors duration-300 transform rounded-md"
            onClick={() => setShowAction(false)}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionSelect;
