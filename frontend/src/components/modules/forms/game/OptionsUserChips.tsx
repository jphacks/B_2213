import { useContext } from "react";
import { MemberContext } from "../../../../../pages/game/waitRoom/[roomID]";
import { OptionsContext } from "../../../Organisms/game/SetOption";

type PropsType = {
  setUserChips: (chips: number, userID: string) => void;
};
const OptionsUserChips = () => {
  const { memberInfo } = useContext(MemberContext);
  const { options, setOptions } = useContext(OptionsContext);

  const setUserChips = (chips: number, userID: string) => {
    const optionsObj = options; // stateを代入しワンクッション踏ませることでoptionを追加している
    optionsObj.stacks[userID] = chips;
    setOptions({ ...options, stacks: optionsObj.stacks });
  };

  return (
    <ul className="pl-2">
      {Object.keys(memberInfo).map((key) => (
        <li key={key} className="pb-3 text-xl flex justify-between">
          <p>{memberInfo[key].userName}</p>
          <input
            value={options.stacks[key] ?? 1000} // 初期ではundefinedとなるため仮に1000をおく
            type="number"
            className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
            autoComplete="off"
            onChange={(e) => {
              setUserChips(Number(e.target.value), key);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
export default OptionsUserChips;
