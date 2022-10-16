import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../../../pages/_app";
import { OptionsContext } from "../../../Organisms/game/SetOption";

const SendOptions = () => {
  const { userInfo } = useContext(UserContext);
  const { options } = useContext(OptionsContext);

  const sendOptions = async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/ingame/" +
        userInfo.roomID +
        "/options";
      await axios.post(apiUrl, options);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="pt-3 pb-8 z-10 absolute bottom-0 right-0 bg-poker-color">
      <button
        className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => sendOptions()}
      >
        Start
      </button>
    </div>
  );
};
export default SendOptions;
