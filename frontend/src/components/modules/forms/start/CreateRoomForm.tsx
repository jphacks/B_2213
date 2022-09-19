import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import { useState } from "react";

const CreateRoomForm = () => {
  const [user_name, setUserName] = useState<string>("");
  const handleSendButton = () => {
    console.log(user_name);
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ user_name, setUserName }} />
      <SendButton handleSendButton={() => handleSendButton()} />
    </div>
  );
};

export default CreateRoomForm;
