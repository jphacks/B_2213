import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../src/components/hooks/user/useUserInfo";
import ActionSelect from "../../../src/components/Organisms/game/ActionSelect";
import PlayMenu from "../../../src/components/Organisms/game/PlayMenu";
import Loading from "../../../src/components/templates/Loading";
import {
  GameContextType,
  GameInfoType,
  RoomStatusType,
} from "../../../src/types/game/type";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

const PlayRoom: NextPage = () => {
  const { userInfo, confirmUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();
  const socketRef = useRef<WebSocket>();
  const [isReady, setIsReady] = useState({
    userInfoReady: false, // userInfoが取得できているか
    roomStatusReady: false, // roomStatusがwaiting状態であるかどうか
    message_WS_Ready: false, //WSでbackendからmember情報を受け取っているか
  });

  const [showAction, setShowAction] = useState<Boolean>(false);
  const [gameInfo, setGameInfo] = useState<GameInfoType>({
    // モックデータ使わない時は()とからにしておく
    roomID: "",
    roomData: {
      round: 1,
      stage: 2,
      toCall: 100,
      sb: {
        user: "",
        amount: 50,
      },
      bb: {
        user: "",
        amount: 100,
      },
      pot: 100,
    },
    users: {
      Uasdfas: {
        userName: "",
        stack: 80,
        joining: false,
        bettingTips: 0,
        allIn: false,
        actioned: false,
        admin: false,
        sessionAlive: true,
      },
    },
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

      if (!(roomStatus === "on game")) {
        // on gameの状態でなければgameできない
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

      const { roomID } = router.query;
      if (roomID !== userInfo.roomID) {
        router.push("/start");
        return;
      }

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
      console.log("Connected");
    };

    socketRef.current.onclose = function () {
      console.log("closed");
    };

    // server 側から送られてきたデータを受け取る
    socketRef.current.onmessage = function (event) {
      const gameInfo_JSON = event.data;
      const gameInfo_obj: GameInfoType = JSON.parse(gameInfo_JSON);
      console.log(gameInfo_obj);
      setGameInfo(gameInfo_obj);
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
    <GameContext.Provider value={{ gameInfo, setGameInfo }}>
      <div className="bg-poker-color font-poker-color font-poker-family">
        <section className="h-screen bg-cover">
          <div className="flex w-full items-center justify-center container mx-auto px-8">
            <div className="max-w-2xl text-center">
              <PlayMenu
                {...{ showAction: showAction, setShowAction: setShowAction }}
              />
            </div>
          </div>

          <ActionSelect
            {...{ showAction: showAction, setShowAction: setShowAction }}
          />
        </section>
      </div>
    </GameContext.Provider>
  );
};

export default PlayRoom;
