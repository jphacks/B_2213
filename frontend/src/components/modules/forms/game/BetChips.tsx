import { memo, useState } from "react";

// eslint-disable-next-line react/display-name
const BetChips = memo(() => {
  const [focusStyle, setFocusStyle] = useState<string>(
    " border-2 border-[#393939]"
  );
  // ^^^初期値を背景色と同じでborderを説得しておくことで
  // focus時にborderが現れたことでUIが少しズレるのを防ぐ
  return (
    <div>
      <div className="text-6xl py-5 sm:text-5xl lg:text-7xl flex justify-center items-center">
        <h1 className={"p-2 rounded-md" + focusStyle}>2400000</h1>
      </div>

      <div className="tracking-widest flex flex-row justify-center items-center">
        <input
          id="range"
          type="range"
          className="flex w-10/12 mr-2 accent-[#95913f]"
          onMouseOver={() => setFocusStyle(" border-2 border-[#95913f]")} // パソコン用
          onMouseLeave={() => setFocusStyle(" border-2 border-[#393939]")} // パソコン用
          onTouchMove={() => setFocusStyle(" border-2 border-[#95913f]")} // スマホ・タブレット用
          onTouchEnd={() => setFocusStyle(" border-2 border-[#393939]")} // スマホ・タブレット用
        />
        <input
          type="number"
          className="w-6 h-6 rounded-md outline-none bg-[#757575] text-[#757575]"
          onFocus={() => setFocusStyle(" border-2 border-[#95913f]")}
          onBlur={() => setFocusStyle(" border-2 border-[#393939]")}
        />
      </div>
    </div>
  );
});

export default BetChips;
