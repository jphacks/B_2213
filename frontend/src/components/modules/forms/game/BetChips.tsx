import type { ActionInfoProps } from "../../../../types/game/type";

// eslint-disable-next-line react/display-name
const BetChips = ({ actionInfo, setActionInfo }: ActionInfoProps) => {
  // 条件分岐が複雑なためswitchを用いてわかりやすくする。
  const changeBetValue = (betValue: number) => {
    switch (true) {
      case betValue < actionInfo.memberMaxBet - actionInfo.pastBet:
        setActionInfo({
          ...actionInfo,
          bet: Math.min(
            actionInfo.memberMaxBet - actionInfo.pastBet,
            actionInfo.allChips
          ),
        });
        break;
      case betValue > actionInfo.allChips:
        setActionInfo({ ...actionInfo, bet: actionInfo.allChips });
        break;
      default:
        setActionInfo({ ...actionInfo, bet: betValue });
    }
  };

  return (
    <div>
      <div className="pt-5 flex justify-center items-center">
        <input
          type="number"
          autoComplete="off"
          value={actionInfo.bet}
          onChange={(e) =>
            setActionInfo({ ...actionInfo, bet: Number(e.target.value) })
          }
          onBlur={() => changeBetValue(actionInfo.bet)}
          className="text-center text-5xl p-2 h-16 w-9/12 sm:w-5/12 md:w-3/12 bg-[#4f4e4e] text-[#95913f] rounded-md outline-none"
        />
      </div>
      <div className="pt-3">
        {[0.5, 2, 3, 4].map((value, key) => {
          return (
            <button
              key={key}
              className="px-2 py-2 mr-3 border-gold-button transition-colors duration-300 transform rounded-md"
              onClick={() => changeBetValue(actionInfo.pot * value)}
              // ^^^もしstage変わるまでpotが変わらないパターンのときは(pot + memberMaxBet) * value
            >
              ×{value}
            </button>
          );
        })}

        <button
          className="px-2 py-2 ml-3 border-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => changeBetValue(actionInfo.allChips)}
        >
          all in
        </button>
      </div>
    </div>
  );
};

export default BetChips;
