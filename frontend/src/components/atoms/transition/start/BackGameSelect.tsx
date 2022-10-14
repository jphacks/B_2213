import type { SetGameProps } from "../../../../types/game/type";

const BackGameSelect = (props: SetGameProps) => {
  const { setGameType } = props;

  return (
    <h1
      onClick={() => setGameType(null)}
      className="text-2xl z-10 absolute top-5 left-5"
    >
      back
    </h1>
  );
};

export default BackGameSelect;
