import Link from "next/link";
import type { GameProps } from "../../../../../src/types/type";

const CreateRoomLink = (props: GameProps) => {
  const { gameType } = props;
  return (
    <Link href={"/create-room"}>
      <h1 className="text-6xl mb-20 sm:text-5xl capitalize tracking-widest text-gray-900 lg:text-7xl">
        New Room
      </h1>
    </Link>
  );
};

export default CreateRoomLink;
