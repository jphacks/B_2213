import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import RoomIdInput from "../../../atoms/form/start/RoomIdInput";
import { useState } from "react";
import ErrorMessage from "../../../atoms/form/start/ErrorMessage";
import axios from "axios";
import { useUserInfo } from "../../../hooks/user/useUserInfo";
import type { UserInfoType } from "../../../../types/user/type";
import { useRouter } from "next/router";

const JoinRoomForm = ({ gameType }: { gameType: string }) => {
  const [userName, setUserName] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userInfo, setUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();

  const handleSendButton = async () => {
    if (userName.replace(/\s+/g, "") && roomID.replace(/\s+/g, "")) {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL + "/joinRoom/" + gameType;
        const res = await axios.post(apiUrl, {
          userName: userName,
        });

        // resとしてはgameTypeはかえってこないため、saveUserInfoにgameTypeを追加し
        // contextとcookieに保存する。
        const saveUserInfo: UserInfoType = res.data;
        saveUserInfo.gameType = gameType;
        setUserInfo_context_cookie(saveUserInfo);

        router.push("/game/waitRoom/" + saveUserInfo.roomID);
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
