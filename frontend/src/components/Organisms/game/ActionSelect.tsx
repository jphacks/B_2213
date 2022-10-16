import { memo, useState } from "react";
import styles from "../../../../styles/Home.module.css";
import { ActionInfoType } from "../../../types/game/type";
import BetChips from "../../modules/forms/game/BetChips";
import ActionButtons from "../../modules/select/game/ActionButtons";

type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};

const maxBet = 100; // ゲームでの最高bet額を入れるようにする。
const allChips = 100001; // 所持しているchipを入れるようにする。

// eslint-disable-next-line react/display-name
const ActionSelect = memo<ShowActionProps>((props) => {
  const { showAction, setShowAction } = props;

  const [bet, setBet] = useState(maxBet < allChips ? maxBet : allChips); // 初期値はそのゲームでの最高bet額を入れるようにする。
  const [actionInfo, setActionInfo] = useState<ActionInfoType>({
    canActions: ["call", "raise", "fold"],
    selectedAction: 0,
    bet: maxBet < allChips ? maxBet : allChips,
  });

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        {/* maxbetやallchipsはuseContextで渡す */}
        <ActionButtons {...{ actionInfo, setActionInfo }} />

        <BetChips {...{ bet, setBet }} />

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
