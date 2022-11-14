import { useContext } from "react";
import { OptionsContext } from "../../../Organisms/game/SetOption";

const OptionsBBSB = () => {
  const { options, setOptions } = useContext(OptionsContext);
  return (
    <div className="pt-3 pl-2">
      <div className="py-4 flex justify-between">
        <h1 className="text-3xl w-full">Chips of BB</h1>
        <input
          value={options.bb}
          type="tel"
          className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
          autoComplete="off"
          onChange={(e) =>
            setOptions({ ...options, bb: Number(e.target.value) })
          }
        />
      </div>
      <div className="py-4 flex justify-between">
        <h1 className="text-3xl w-full">Chips of SB</h1>
        <input
          value={options.sb}
          type="tel"
          className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
          autoComplete="off"
          onChange={(e) =>
            setOptions({ ...options, sb: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
};
export default OptionsBBSB;
