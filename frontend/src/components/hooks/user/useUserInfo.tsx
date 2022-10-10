import axios from "axios";
import { useCallback, useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import type { UserInfoType } from "../../../types/user/type";

export const useUserInfo = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const setUserInfo_context_cookie = useCallback(
    async (saveUserInfo: UserInfoType) => {
      // context
      setUserInfo(saveUserInfo);

      // cookie
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/cookie";
        const res = await axios.get(apiUrl);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const confirmUserInfo_context_cookie =
    useCallback(async (): Promise<boolean> => {
      // cookie
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/checkCookie";
        const res = await axios.get(apiUrl);
        console.log(res);
      } catch (e) {
        console.log(e);
      }

      // context
      if (!userInfo.userID) {
        return false;
      }
      return true;
    }, [userInfo]);

  return {
    userInfo,
    setUserInfo_context_cookie,
    confirmUserInfo_context_cookie,
  };
};
