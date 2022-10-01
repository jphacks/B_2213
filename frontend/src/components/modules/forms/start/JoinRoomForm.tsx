import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import RoomIdInput from "../../../atoms/form/start/RoomIdInput";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";
import axios from "axios";

const JoinRoomForm = ({ gameType }: { gameType: string }) => {
  const [userName, setUserName] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendButton = async () => {
    if (userName.replace(/\s+/g, "") && roomID.replace(/\s+/g, "")) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/joinRoom/poker";
        const res = await axios.post(apiUrl, {
          userName: userName,
        });

        console.log(res.data);
      } catch (e) {
        console.log(e);
        setErrorMessage("unexpected error");
      }
    } else {
      setErrorMessage("please input username or roomid");
    }
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ userName, setUserName }} />
      <RoomIdInput {...{ roomID, setRoomID }} />
      <SendButton handleSendButton={() => handleSendButton()} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default JoinRoomForm;
