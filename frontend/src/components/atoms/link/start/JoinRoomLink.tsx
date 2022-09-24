import Link from "next/link";
import type { GameProps } from "../../../../types/game/type";

const JoinRoomLink = (props: GameProps) => {
  const { gameType } = props;

  return (
    <Link href={"/start/joinRoom/" + gameType}>
      <h1 className="text-[50px] mb-20 sm:text-5xl capitalize tracking-widest lg:text-7xl">
        Join Room
      </h1>
    </Link>
  );
};

export default JoinRoomLink;
