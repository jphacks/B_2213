import { NextPage } from "next";
import { useRouter } from "next/router";
import BackStartPage from "../../../src/components/atoms/transition/start/BackStartPage";
import CreateRoomForm from "../../../src/components/modules/forms/start/CreateRoomForm";
import JoinRoomForm from "../../../src/components/modules/forms/start/JoinRoomForm";

const JoinRoom: NextPage = () => {
  // 動的ルーティングの各値を取得
  const router = useRouter();
  const { game_type, room_type } = router.query;

  // 指定の動的ルーティング以外はstartページへリダイレクト
  if (
    (game_type !== "poker" && game_type !== "mahjong") ||
    (room_type !== "create_room" && room_type !== "join_room")
  ) {
    router.push("/start");
  }

  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <BackStartPage game_type={game_type as string} />
          {room_type === "create_room" ? (
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
