import UserNameInput from "../../../atoms/form/start/UserNameInput";
import GeneralButton from "../../../atoms/form/start/GeneralButton";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";
import axios from "axios";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import type { UserInfoType } from "../../../../types/user/type";
import { useRouter } from "next/router";

const CreateRoomForm = ({ gameType }: { gameType: string }) => {
  const [userName, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userInfo, setUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();

  const handleSendButton = async () => {
    if (userName.replace(/\s+/g, "")) {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL + "/api/createRoom/" + gameType;
        const res = await axios.post(apiUrl, {
          userName: userName,
        });

        // resとしてはgameTypeはかえってこないため、saveUserInfoにgameTypeを追加し
        // contextとcookieに保存する。
        const saveUserInfo: UserInfoType = res.data.data;
        saveUserInfo.gameType = gameType;
        setUserInfo_context_cookie(saveUserInfo);

        router.push("/game/waitRoom/" + saveUserInfo.roomID);
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

      <div className="mt-20">
        <GeneralButton
          handleSendButton={() => handleSendButton()}
          typeName="Send"
          css="border-gold-button"
        />
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default CreateRoomForm;
