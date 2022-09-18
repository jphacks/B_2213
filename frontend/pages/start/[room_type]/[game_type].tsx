import { NextPage } from "next";
import { useRouter } from "next/router";
import CreateRoomForm from "../../../src/components/modules/forms/start/CreateRoomForm";
import JoinRoomForm from "../../../src/components/modules/forms/start/JoinRoomForm";

const JoinRoom: NextPage = () => {
  // 動的ルーティングの各値を取得
  const router = useRouter();
  const { game_type, room_type } = router.query;

  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          {room_type == "create_room" ? (
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
