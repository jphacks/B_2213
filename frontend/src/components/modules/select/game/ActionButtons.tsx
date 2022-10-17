import { useEffect } from "react";
import { ActionInfoProps } from "../../../../types/game/type";
import { useGameInfo } from "../../../hooks/game/useGameInfo";

const ActionButtons = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users["Uasdfas"].bettingTips; // useIDに自分のを入れるように今後する
  const stack = gameInfo.users["Uasdfas"].stack; // useIDに自分のを入れるように今後する

  const selectAction = (selectNumber: number) => {
    const actionName = actionInfo.canActions[selectNumber];
    switch (actionName) {
      case "fold":
        setActionInfo({ ...actionInfo, willBet: 0 });
        break;
      case "bet":
      case "raise": // betまたはraiseの場合checkと同じ値+100に初期設定。持ち金を越えれば持ち金の値に設定
        setActionInfo({
          ...actionInfo,
          willBet: Math.min(toCall - bettingTips + 100, stack),
        });
        break;
      default:
        setActionInfo({
          ...actionInfo,
          willBet: Math.min(toCall - bettingTips, stack),
        });
    }
  };

  useEffect(() => {
    const canActions = actionInfo.canActions;
    switch (true) {
      case actionInfo.willBet == toCall - bettingTips:
        setActionInfo({
          ...actionInfo,
          selectedAction: Math.max(
            canActions.indexOf("call"),
            canActions.indexOf("check")
          ),
        });
        break;
      case actionInfo.willBet == 0:
        setActionInfo({
          ...actionInfo,
          selectedAction: canActions.indexOf("fold"),
        });
        break;
      case actionInfo.willBet < toCall - bettingTips:
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
  }, [actionInfo.willBet]);

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
