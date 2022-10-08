import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AnimationStrWaiting from "../../../src/components/atoms/show/game/AnimationStrWaiting";
import ShowRoomId from "../../../src/components/atoms/show/game/ShowRoomId";
import WaitMemberList from "../../../src/components/atoms/show/game/WaitMemberList";
import { useUserInfo } from "../../../src/components/hooks/user/useUserInfo";
import Loading from "../../../src/components/templates/Loading";
import axios from "axios";
import type { RoomStatusType } from "../../../src/types/game/type";

type ReadyType = {
  userInfoReady: boolean;
  roomStatusReady: boolean;
};

const WaitRoom: NextPage = () => {
  const { userInfo, confirmUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();
  const [isReady, setIsReady] = useState<ReadyType>({
    userInfoReady: false, // userInfoが取得できているか
    roomStatusReady: false, // roomStatusがwaiting状態であるかどうか
  });

  const confirmRoomStatus = useCallback(async () => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL +
      "/status/" +
      userInfo.gameType +
      "/" +
      userInfo.roomID;
    const res = await axios.get(apiUrl);
    const roomStatus: RoomStatusType = res.data.status;

    if (!(roomStatus === "waiting")) {
      // waitingの状態でなければwaitRoomにいる必要はない
      router.push("/start");
    }
  }, [router, userInfo.gameType, userInfo.roomID]);

  useEffect(() => {
    if (!confirmUserInfo_context_cookie()) {
      router.push("/start");
    }
    setIsReady((isReady) => ({ ...isReady, userInfoReady: true }));

    confirmRoomStatus();
    setIsReady((isReady) => ({ ...isReady, roomStatusReady: true }));
  }, []);

  if (!(isReady.userInfoReady && isReady.roomStatusReady)) {
    return <Loading />;
  }

  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <AnimationStrWaiting />
            <ShowRoomId roomID={userInfo.roomID as string} />
            <WaitMemberList />
            <div className="pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
              <button className="px-6 py-2 mr-1 border-gold-button transition-colors duration-300 transform rounded-md">
                Quit Room
              </button>
              <button className="px-6 py-2 ml-1 bg-gold-button transition-colors duration-300 transform rounded-md">
                Start Room
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaitRoom;
