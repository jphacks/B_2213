import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnimationStrWaiting from "../../../src/components/atoms/show/game/AnimationStrWaiting";
import ShowRoomId from "../../../src/components/atoms/show/game/ShowRoomId";
import WaitMemberList from "../../../src/components/atoms/show/game/WaitMemberList";
import { useUserInfo } from "../../../src/components/hooks/user/useUserInfo";
import Loading from "../../../src/components/templates/Loading";

type ReadyType = {
  userInfoReady: boolean;
  memberInfoReady: boolean;
};

const WaitRoom: NextPage = () => {
  const [isReady, setIsReady] = useState<ReadyType>({
    userInfoReady: false, // userInfoが取得できているか
    memberInfoReady: true, // wsによって一回でもroomのmember情報を取得できているかどうか
  });
  const { userInfo, confirmUserInfo_context_cookie } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!confirmUserInfo_context_cookie()) {
      router.push("/start");
    }
    setIsReady((isReady) => ({ ...isReady, userInfoReady: true }));
  }, []);

  if (!(isReady.userInfoReady && isReady.memberInfoReady)) {
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
