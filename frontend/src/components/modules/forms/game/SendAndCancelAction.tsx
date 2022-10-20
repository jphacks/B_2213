import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../../../pages/_app";
import { ActionInfoProps } from "../../../../types/game/type";
import { UIControllContext } from "../../../templates/game/GameController";

const SendAndCancelAction = ({ actionInfo }: ActionInfoProps) => {
  const { setShowAction } = useContext(UIControllContext);
  const { userInfo } = useContext(UserContext);

  const decideApiType = (actionName: string) => {
    if (actionName == "call" || actionName == "check") {
      return "/call";
    } else if (actionName == "raise" || actionName == "bet") {
      return "/raise";
    } else {
      return "/fold";
    }
  };

  const sendAction = async () => {
    try {
      const selectedNumber = actionInfo.selectedAction;
      const actionName = actionInfo.canActions[selectedNumber];
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/ingame/" +
        userInfo.roomID +
        decideApiType(actionName) +
        "?userID=" +
        userInfo.userID;

      await axios.post(apiUrl, {
        amount: actionInfo.willBet,
      });
    } catch (e) {
      console.log(e);
      return;
    }

    setShowAction(false);
  };

  return (
    <div className="mt-10">
      <button
        className="px-6 py-2 mx-5 border-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => setShowAction(false)}
      >
        Cancel
      </button>
      <button
        className="px-6 py-2 mx-5 bg-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => sendAction()}
      >
        Send
      </button>
    </div>
  );
};

export default SendAndCancelAction;
