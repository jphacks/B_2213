import Link from "next/link";
import type { GameProps } from "../../../../types/type";

const CreateRoomLink = (props: GameProps) => {
  const { gameType } = props;

  return (
    <Link href={"/create-room/" + gameType}>
      <h1 className="text-[50px] mb-20 sm:text-5xl capitalize tracking-widest lg:text-7xl">
        New Room
      </h1>
    </Link>
  );
};

export default CreateRoomLink;
