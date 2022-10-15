import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import AnimationStrWaiting from "../../../src/components/atoms/show/game/AnimationStrWaiting";
import ShowRoomId from "../../../src/components/atoms/show/game/ShowRoomId";
import WaitingMember from "../../../src/components/atoms/show/game/WaitingMember";
import { useUserInfo } from "../../../src/components/hooks/user/useUserInfo";
import Loading from "../../../src/components/templates/Loading";
import axios from "axios";
import type {
  MemberContextType,
  RoomStatusType,
  MemberInfoType,
} from "../../../src/types/game/type";
import StartQuitRoomButton from "../../../src/components/modules/forms/game/StartQuitRoomButton";

// useContextでメンバー情報を子コンポーネントに共有
export const MemberContext = createContext<MemberContextType>({
  memberInfo: {},
  setMemberInfo: (memberInfo) => {},
});

const WaitRoom: NextPage = () => {
  const { userInfo, confirmUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<MemberInfoType>({});
  const [isReady, setIsReady] = useState({
    userInfoReady: false, // userInfoが取得できているか
    roomStatusReady: false, // roomStatusがwaiting状態であるかどうか
    message_WS_Ready: false, //WSでbackendからmember情報を受け取っているか
  });

  const confirmRoomStatus = useCallback(async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/status/" +
        userInfo.gameType +
        "/" +
        userInfo.roomID;
      const res = await axios.get(apiUrl);
      const roomStatus: RoomStatusType = res.data.status;

      if (!(roomStatus === "waiting")) {
        // waitingの状態でなければwaitRoomにいる必要はない
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }, [userInfo.gameType, userInfo.roomID]);

  useEffect(() => {
    (async () => {
      if (!(await confirmUserInfo_context_cookie())) {
        router.push("/start");
        return;
      }
      setIsReady((isReady) => ({ ...isReady, userInfoReady: true }));

      if (!(await confirmRoomStatus())) {
        router.push("/start");
        return;
      }
      setIsReady((isReady) => ({ ...isReady, roomStatusReady: true }));
    })();
  }, []);

  // WSによるリアルタイム通信
  useEffect(() => {
    if (!isReady.roomStatusReady) {
      // roomの状態やuser情報が確認でき次第WS通信を行う。
      return;
    }

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
      setMemberInfo(gameInfo_obj.users);
      setIsReady((isReady) => ({ ...isReady, message_WS_Ready: true }));
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, [isReady.roomStatusReady, userInfo.roomID, userInfo.userID]);

  if (
    !(
      isReady.userInfoReady &&
      isReady.roomStatusReady &&
      isReady.message_WS_Ready
    )
  ) {
    return <Loading />;
  }

  return (
    <MemberContext.Provider value={{ memberInfo, setMemberInfo }}>
      <div className="bg-poker-color font-poker-color font-poker-family">
        <section className="h-screen bg-cover">
          <div className="flex w-full items-center justify-center container mx-auto px-8">
            <div className="max-w-2xl text-center">
              <AnimationStrWaiting />
              <ShowRoomId roomID={userInfo.roomID as string} />
              <WaitingMember />
              <StartQuitRoomButton />
            </div>
          </div>
        </section>
      </div>
    </MemberContext.Provider>
  );
};

export default WaitRoom;
