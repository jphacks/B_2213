import axios from "axios";
import { memo, useContext, useState } from "react";
import { UserContext } from "../../../../pages/_app";
import GeneralButton from "../../atoms/form/start/GeneralButton";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import Result from "./Result";

// eslint-disable-next-line react/display-name
const ModalBBSB = memo(() => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const roomData = gameInfo.roomData;
  const [showResult, setShowResult] = useState(false);

  const selectBBSB = async (type_bb_sb: "bb" | "sb") => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/ingame/" +
        userInfo.roomID +
        "/" +
        type_bb_sb +
        "?userID=" +
        userInfo.userID;
      await axios.post(apiUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-30 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-[#636363] inset-0 z-0">
        <div className="mt-10 pl-5">
          <GeneralButton
            handleSendButton={() => setShowResult(true)}
            typeName="Show Result"
            css="bg-black-button"
          />
        </div>
      </div>

      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-poker-color font-poker-color font-poker-family">
        <div className="text-center p-5 flex-auto justify-center">
          <h2 className="text-4xl">Round : {roomData.round}</h2>
          <h2 className="text-4xl pt-8">Select BB SB</h2>
          <p className="text-[12px] pt-2 pb-8">
            Do not select if you are not BB or SB
          </p>
          <button
            className="mb-2 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full"
            onClick={() => selectBBSB("bb")}
          >
            BB
          </button>
          <button
            className="mb-2 mx-3 border-gold-button px-5 py-2 text-sm shadow-sm font-medium tracking-wider rounded-full"
            onClick={() => selectBBSB("sb")}
          >
            SB
          </button>
        </div>
      </div>
      {showResult ? <Result setShowResult={setShowResult} /> : null}
    </div>
  );
});

export default ModalBBSB;
