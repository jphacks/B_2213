import { memo } from "react";

// eslint-disable-next-line react/display-name
const ActionButtons = memo(() => {
  return (
    <div className="pt-5">
      <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
        check
      </button>
      <button className="px-6 py-2 mx-8 border-gold-button transition-colors duration-300 transform rounded-md">
        bet
      </button>
      <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
        fold
      </button>
    </div>
  );
});

export default ActionButtons;
