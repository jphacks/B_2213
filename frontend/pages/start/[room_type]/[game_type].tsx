import { NextPage } from "next";
import { useRouter } from "next/router";
import JoinRoomForm from "../../../src/components/modules/forms/start/JoinRoomForm";

const JoinRoom: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <JoinRoomForm />
        </div>
      </section>
    </div>
  );
};

export default JoinRoom;
