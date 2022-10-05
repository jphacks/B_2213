import { memo, useState } from "react";
import type { BetProps } from "../../../../types/game/type";

const maxBet = 100; // ゲームでの最高bet額を入れるようにする。
const allChips = 100001; // 所持しているchipを入れるようにする。

// eslint-disable-next-line react/display-name
const BetChips = memo<BetProps>(({ bet, setBet }) => {
  const changeBetValue = (betValue: number) => {
    if (betValue < maxBet) {
      return setBet(maxBet);
    }
    if (betValue > allChips) {
      return setBet(allChips);
    }

    return setBet(betValue);
  };

  return (
    <div>
      <div className="pt-5 flex justify-center items-center">
        <input
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          onBlur={() => changeBetValue(bet)}
          className="text-center text-5xl p-2 h-16 w-9/12 sm:w-5/12 md:w-3/12 bg-[#4f4e4e] text-[#95913f] rounded-md outline-none"
        />
      </div>
      <div className="pt-3">
        {[2, 3, 4, 5].map((value, key) => {
          return (
            <button
              key={key}
              className="px-2 py-2 mr-3 border-gold-button transition-colors duration-300 transform rounded-md"
              onClick={() => changeBetValue(maxBet * value)}
            >
              ×{value}
            </button>
          );
        })}

        <button
          className="px-2 py-2 ml-3 border-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => changeBetValue(allChips)}
        >
          all in
        </button>
      </div>
    </div>
  );
});

export default BetChips;
