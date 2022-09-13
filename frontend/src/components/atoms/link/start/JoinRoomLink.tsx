import Link from "next/link";
import type { GameProps } from "../../../../types/type";

const JoinRoomLink = (props: GameProps) => {
  const { gameType } = props;

  return (
    <Link href={"/join-room/" + gameType}>
      <h1 className="text-6xl mb-20 sm:text-5xl capitalize tracking-widest text-gray-900 lg:text-7xl">
        Join Room
      </h1>
    </Link>
  );
};

export default JoinRoomLink;
