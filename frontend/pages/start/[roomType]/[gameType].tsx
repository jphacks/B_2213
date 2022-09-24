import { NextPage } from "next";
import { useRouter } from "next/router";
import BackStartPage from "../../../src/components/atoms/transition/start/BackStartPage";
import CreateRoomForm from "../../../src/components/modules/forms/start/CreateRoomForm";
import JoinRoomForm from "../../../src/components/modules/forms/start/JoinRoomForm";
import Loading from "../../../src/components/templates/Loading";

const JoinRoom: NextPage = () => {
  // 動的ルーティングの各値を取得
  const router = useRouter();
  const isReady = router.isReady;

  // 初回ロード時は最初queryの値を取ってこれずqueryはundifindとなる
  // またその時にpushメソッドを呼んでも準備ができておらずpush実行時エラーとなる
  // 以下によりrouterの準備ができるまでLoadingで回避
  // SSGを用いるときはrouter.isReadyはuseEffect の中で使わなければならないことに注意
  if (!isReady) {
    return <Loading />;
  }

  const { gameType, roomType } = router.query;

  // 指定の動的ルーティング以外はstartページへリダイレクト
  if (
    (gameType !== "poker" && gameType !== "mahjong") ||
    (roomType !== "createRoom" && roomType !== "joinRoom")
  ) {
    router.push("/start");
  }

  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <BackStartPage gameType={gameType as string} />
          {roomType === "createRoom" ? (
            <div>
              <CreateRoomForm />
            </div>
          ) : (
            <JoinRoomForm />
          )}
        </div>
      </section>
    </div>
  );
};

export default JoinRoom;
