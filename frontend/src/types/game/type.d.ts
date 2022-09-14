export type GameProps = {
  gameType: string;
};

export type SetGameProps = {
  setGameType: (gameType: string | null) => void;
};
