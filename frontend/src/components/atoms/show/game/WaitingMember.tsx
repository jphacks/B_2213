import { memo, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../../../pages/_app";

// eslint-disable-next-line react/display-name
const WaitingMember = memo(() => {
  const { userInfo } = useContext(UserContext);
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // const [memberInfo, setMemberInfo] = useState

  useEffect(() => {
    socketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL +
        "/ws/" +
        userInfo.roomID +
        "?userID=" +
        userInfo.userID
    );

    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log("Connected");
    };

    socketRef.current.onclose = function () {
      console.log("closed");
      setIsConnected(false);
    };

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      const gameInfo_JSON = event.data;
      const gameInfo_obj = JSON.parse(gameInfo_JSON);
      console.log(gameInfo_obj);
      console.log(gameInfo_obj.users); // userInfoはnullの時スタート画面に戻るためこの段階でnullであることはない
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, []);
  return (
    <ul className="pt-8 text-2xl capitalize tracking-widest border-t-2 border-[#95913f]">
      <li className="pb-3">Hasegawa Akito</li>
      <li className="pb-3">Tano</li>
      <li className="pb-3">Hujithiy</li>
    </ul>
  );
});

export default WaitingMember;
