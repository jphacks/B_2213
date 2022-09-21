import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";

const CreateRoomForm = () => {
  const [user_name, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendButton = () => {
    if (user_name.replace(/\s+/g, "")) {
      console.log(user_name);
    } else {
      setErrorMessage("please input username");
    }
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ user_name, setUserName }} />
      <SendButton handleSendButton={() => handleSendButton()} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default CreateRoomForm;
