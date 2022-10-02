import { useCallback, useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import type { UserInfoType } from "../../../types/user/type";

export const useUserInfo = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const setUserInfo_context_cookie = useCallback(
    (saveUserInfo: UserInfoType) => {
      setUserInfo(saveUserInfo);
    },
    []
  );

  return { userInfo, setUserInfo_context_cookie };
};
