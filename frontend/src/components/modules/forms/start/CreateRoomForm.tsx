import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";
import axios from "axios";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import type { UserInfoType } from "../../../../types/user/type";

const CreateRoomForm = ({ gameType }: { gameType: string }) => {
  const [userName, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userInfo, setUserInfo_context_cookie } = useUserInfo();

  const handleSendButton = async () => {
    if (userName.replace(/\s+/g, "")) {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL + "/createRoom/" + gameType;
        const res = await axios.post(apiUrl, {
          userName: userName,
        });

        // resとしてはgameTypeはかえってこないため、saveUserInfoにgameTypeを追加し
        // contextとcookieに保存する。
        const saveUserInfo: UserInfoType = res.data;
        saveUserInfo.gameType = gameType;
        setUserInfo_context_cookie(saveUserInfo);
      } catch (e) {
        console.log(e);
        setErrorMessage("unexpected error");
      }
    } else {
      setErrorMessage("please input username");
    }
  };

  return (
    <div className="max-w-2xl text-center">
      <UserNameInput {...{ userName, setUserName }} />
      <SendButton handleSendButton={() => handleSendButton()} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default CreateRoomForm;
