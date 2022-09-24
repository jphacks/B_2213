import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import RoomIdInput from "../../../atoms/form/start/RoomIdInput";
import { useState } from "react";

const JoinRoomForm = () => {
  const [userName, setUserName] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");

  const handleSendButton = () => {
    console.log(userName);
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ userName, setUserName }} />
      <RoomIdInput {...{ roomID, setRoomID }} />
      <SendButton handleSendButton={() => handleSendButton()} />
    </div>
  );
};

export default JoinRoomForm;
