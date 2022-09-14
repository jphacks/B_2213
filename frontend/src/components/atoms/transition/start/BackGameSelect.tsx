import type { SetGameProps } from "../../../../types/game/type";

const BackGameSelect = (props: SetGameProps) => {
  const { setGameType } = props;

  return (
    <div
      onClick={() => setGameType(null)}
      className="text-2xl sm:text-2xl lg:text-3xl z-10 absolute top-5 left-5"
    >
      back
    </div>
  );
};

export default BackGameSelect;
