type PropsType = {
  setGameType: (gameType: string) => void;
};

const GameSelect = (props: PropsType) => {
  const { setGameType } = props;
  return (
    <div className="max-w-2xl text-center">
      <h1
        onClick={() => setGameType("poker")}
        className="text-6xl mb-20 sm:text-5xl capitalize tracking-widest text-gray-900 lg:text-7xl"
      >
        poker
      </h1>
      <h1
        onClick={() => setGameType("mahjong")}
        className="text-6xl mb-20 sm:text-5xl capitalize tracking-widest text-gray-900 lg:text-7xl"
      >
        mahjong
      </h1>
    </div>
  );
};

export default GameSelect;
