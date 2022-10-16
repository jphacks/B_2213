import { useEffect } from "react";
import { ActionInfoProps } from "../../../../types/game/type";

// eslint-disable-next-line react/display-name
const ActionButtons = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  const selectAction = (selectNumber: number) => {
    const actionName = actionInfo.canActions[selectNumber];
    switch (actionName) {
      case "fold":
        setActionInfo({ ...actionInfo, bet: 0 });
        break;
      case "bet":
      case "raise": // betまたはraiseの場合checkと同じ値+100に初期設定。持ち金を越えれば持ち金の値に設定
        setActionInfo({
          ...actionInfo,
          bet: Math.min(
            actionInfo.memberMaxBet - actionInfo.pastBet + 100,
            actionInfo.allChips
          ),
        });
        break;
      default:
        setActionInfo({
          ...actionInfo,
          bet: Math.min(
            actionInfo.memberMaxBet - actionInfo.pastBet,
            actionInfo.allChips
          ),
        });
    }
  };

  useEffect(() => {
    const canActions = actionInfo.canActions;
    switch (true) {
      case actionInfo.bet == actionInfo.memberMaxBet - actionInfo.pastBet:
        setActionInfo({
          ...actionInfo,
          selectedAction: Math.max(
            canActions.indexOf("call"),
            canActions.indexOf("check")
          ),
        });
        break;
      case actionInfo.bet == 0:
        setActionInfo({
          ...actionInfo,
          selectedAction: canActions.indexOf("fold"),
        });
        break;
      case actionInfo.bet < actionInfo.memberMaxBet - actionInfo.pastBet:
        setActionInfo({
          ...actionInfo,
          selectedAction: Math.max(
            canActions.indexOf("call"),
            canActions.indexOf("check")
          ),
        });
        break;
      default:
        setActionInfo({
          ...actionInfo,
          selectedAction: Math.max(
            canActions.indexOf("raise"),
            canActions.indexOf("bet")
          ),
        });
    }
  }, [actionInfo.bet]);

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
          onClick={() => selectAction(key)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
