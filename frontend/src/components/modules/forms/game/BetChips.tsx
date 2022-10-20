import { useContext } from "react";
import { UserContext } from "../../../../../pages/_app";
import type { ActionInfoProps } from "../../../../types/game/type";
import { useGameInfo } from "../../../hooks/game/useGameInfo";

const BetChips = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const toCall = gameInfo.roomData.toCall;
  const bettingTips = gameInfo.users[userInfo.userID!].bettingTips;
  const stack = gameInfo.users[userInfo.userID!].stack;
  const pot = gameInfo.roomData.pot;

  // 条件分岐が複雑なためswitchを用いてわかりやすくする。
  const changeBetValue = (betValue: number) => {
    switch (true) {
      case betValue < toCall - bettingTips:
        setActionInfo({
          ...actionInfo,
          willBet: Math.min(toCall - bettingTips, stack),
        });
        break;
      case betValue > stack:
        setActionInfo({ ...actionInfo, willBet: stack });
        break;
      default:
        setActionInfo({ ...actionInfo, willBet: betValue });
    }
  };

  return (
    <div>
      <div className="pt-5 flex justify-center items-center">
        <p className="text-center text-6xl pr-2">+</p>
        <input
          type="number"
          autoComplete="off"
          value={actionInfo.willBet}
          onChange={(e) =>
            setActionInfo({ ...actionInfo, willBet: Number(e.target.value) })
          }
          onBlur={() => changeBetValue(actionInfo.willBet)}
          className="text-center text-5xl p-2 h-16 w-1/2 sm:w-5/12 md:w-3/12 bg-[#4f4e4e] text-[#95913f] rounded-md outline-none"
        />
      </div>
      <div className="pt-3">
        {[0.5, 2, 3, 4].map((value, key) => {
          return (
            <button
              key={key}
              className="px-2 py-2 mr-3 border-gold-button transition-colors duration-300 transform rounded-md"
              onClick={() => changeBetValue(pot * value)}
              // ^^^もしstage変わるまでpotが変わらないパターンのときは(pot + toCall) * value
            >
              ×{value}
            </button>
          );
        })}

        <button
          className="px-2 py-2 ml-3 border-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => changeBetValue(stack)}
        >
          all in
        </button>
      </div>
    </div>
  );
};

export default BetChips;
