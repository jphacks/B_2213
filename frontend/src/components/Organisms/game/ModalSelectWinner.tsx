import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../../pages/_app";
import { useGameInfo } from "../../hooks/game/useGameInfo";

const ModalSelectWinner = () => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const memberInfo = gameInfo.users;
  const [winCandidateList, setWinCandidateList] = useState<string[]>([]);

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-[#636363] inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-poker-color font-poker-color font-poker-family">
        <div className="text-center p-5 flex-auto justify-center">
          <h2 className="text-4xl pt-4">Select Winner</h2>
          <p className="text-[12px] pt-2 pb-8">
            Please pick one winner at a time.
          </p>
          <ul>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
            <li>
              <button className="mb-3 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full">
                Hasegawa
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectWinner;
