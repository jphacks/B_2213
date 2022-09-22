import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";
import axios from "axios";

const CreateRoomForm = () => {
  const [user_name, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSendButton = async () => {
    if (user_name.replace(/\s+/g, "")) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/create_room/poker";
        const res = await axios.post(apiUrl, {
          user_name: user_name,
        });

        console.log(res.data);
      } catch (e) {
        setErrorMessage("unexpected error");
      }
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
