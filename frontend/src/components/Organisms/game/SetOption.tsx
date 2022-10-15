import { memo, useContext, useState } from "react";
import { MemberContext } from "../../../../pages/game/waitRoom/[roomId]";
import { OptionType } from "../../../types/game/type";
import BackWaitRoom from "../../atoms/transition/game/BackWaitRoom";

// eslint-disable-next-line react/display-name
const SetOption = memo<{ setShowOption: (showOption: boolean) => void }>(
  ({ setShowOption }) => {
    const { memberInfo } = useContext(MemberContext);
    const [options, setOptions] = useState<OptionType>({
      stacks: {},
      bb: 100,
      sb: 50,
    });

    const setUserChips = (chips: number, userID: string) => {
      const optionsObj = options;
      optionsObj.stacks[userID] = chips;
      setOptions(optionsObj);
    };

    return (
      <div className="w-screen bg-poker-color z-20 absolute top-0 left-0">
        <BackWaitRoom {...{ setShowOption }} />
        <section className="h-screen bg-cover">
          <div className="flex h-full w-full container mx-auto px-8 max-w-lg">
            <div className="relative">
              <h1 className="text-5xl pt-20 pb-10 w-full">Option</h1>

              <ul className="pl-2">
                <li className="pb-3 text-xl flex justify-between">
                  <p>HHHHHHHHHH</p>
                  <input
                    data-testid="chips_num"
                    name="chips_num"
                    type="number"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </li>
                <li className="pb-3 text-xl flex justify-between">
                  <p>HHHHHHHHHH</p>
                  <input
                    data-testid="username"
                    name="username"
                    type="text"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </li>
                <li className="pb-3 text-xl flex justify-between">
                  <p>HHHHHHHHHH</p>
                  <input
                    data-testid="username"
                    name="username"
                    type="text"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </li>
                <li className="pb-3 text-xl flex justify-between">
                  <p>HHHHHHHHHH</p>
                  <input
                    data-testid="username"
                    name="username"
                    type="text"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </li>
                <li className="pb-3 text-xl flex justify-between">
                  <p>HHHHHHHHHH</p>
                  <input
                    data-testid="username"
                    name="username"
                    type="text"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </li>
              </ul>

              <div className="pt-3 pl-2">
                <div className="py-4 flex justify-between">
                  <h1 className="text-3xl w-full">Chips of BB</h1>
                  <input
                    data-testid="bb_chips"
                    name="bb_chips"
                    type="number"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </div>
                <div className="py-4 flex justify-between">
                  <h1 className="text-3xl w-full">Chips of SB</h1>
                  <input
                    data-testid="bb_chips"
                    name="bb_chips"
                    type="number"
                    className="bg-poker-color border-b-2 border-[#95913f] focus:outline-none w-2/5 text-right"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="pt-3 pb-8 z-10 absolute bottom-0 right-0 bg-poker-color">
                <button
                  className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
                  onClick={() => setUserChips(100, "aa")}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

export default SetOption;
