import { memo } from "react";
import { ActionInfoProps } from "../../../../types/game/type";

// eslint-disable-next-line react/display-name
const ActionButtons = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  return (
    <div className="pt-5 justify-between">
      {actionInfo.canActions.map((value, key) => (
        <button
          key={key}
          className={
            "flex-1 px-6 py-2 mx-4 border border-[#95913f] rounded-md " +
            (key == actionInfo.selectedAction
              ? "bg-[#95913f] text-[#2d2d2d]"
              : "bg-transparent text-[#95913f]")
          }
          onClick={() => setActionInfo({ ...actionInfo, selectedAction: key })}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
