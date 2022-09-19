import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import RoomIdInput from "../../../atoms/form/start/RoomIdInput";
import { useState } from "react";

const JoinRoomForm = () => {
  const [user_name, setUserName] = useState<string>("");
  const [room_id, setRoomId] = useState<string>("");

  const handleSendButton = () => {
    console.log(user_name);
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ user_name, setUserName }} />
      <RoomIdInput {...{ room_id, setRoomId }} />
      <SendButton handleSendButton={() => handleSendButton()} />
    </div>
  );
};

export default JoinRoomForm;
