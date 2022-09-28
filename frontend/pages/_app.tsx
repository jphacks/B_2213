import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";
import type { UserContextType } from "../src/types/user/type";
import type { UserInfoType } from "../src/types/user/type";
import { useState } from "react";

const initUserInfoValue = {
  userId: null,
  roomId: null,
  userName: null,
  permission: null,
};
export const UserContext = createContext<UserContextType>({
  userInfo: initUserInfoValue,
  setUserInfo: (userInfo) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  // ページ全体に対してuseContextで値と値変更の関数を共有
  const [userInfo, setUserInfo] = useState<UserInfoType>(initUserInfoValue);
  const userInfoValue = { userInfo, setUserInfo };

  return (
    <UserContext.Provider value={userInfoValue}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
