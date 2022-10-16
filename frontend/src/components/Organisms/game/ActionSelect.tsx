import { memo, useState } from "react";
import styles from "../../../../styles/Home.module.css";
import { ActionInfoType } from "../../../types/game/type";
import BetChips from "../../modules/forms/game/BetChips";
import ActionButtons from "../../modules/select/game/ActionButtons";

type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};

const maxBet = 1000; // ゲームでの最高bet額を入れるようにする。
const allChips = 10000; // 所持しているchipを入れるようにする。
const pot = 1000;

// eslint-disable-next-line react/display-name
const ActionSelect = memo<ShowActionProps>((props) => {
  const { showAction, setShowAction } = props;
  const [actionInfo, setActionInfo] = useState<ActionInfoType>({
    canActions: ["check", "bet", "fold"],
    selectedAction: 0,
    allChips: allChips,
    bet: maxBet < allChips ? maxBet : allChips,
    pastBet: 0, // そのステージでそれまでbetした値, bet額を足していく。　もしかしたらwsでの値を逐一更新するかも
    memberMaxBet: maxBet,
    pot: pot,
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
});

export default ActionSelect;
