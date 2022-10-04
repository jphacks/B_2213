import { memo, useState } from "react";
import styles from "../../../../styles/Home.module.css";
import BetChips from "../../modules/forms/game/BetChips";
import ActionButtons from "../../modules/select/game/ActionButtons";

type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};

// eslint-disable-next-line react/display-name
const ActionSelect = memo<ShowActionProps>((props) => {
  const { showAction, setShowAction } = props;

  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        <ActionButtons />

        <BetChips />

        <div className="mt-8">
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
