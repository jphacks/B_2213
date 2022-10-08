export type GameProps = {
  gameType: string;
};

export type SetGameProps = {
  setGameType: (gameType: string | null) => void;
};

export type BetProps = {
  bet: number;
  setBet: (bet: number) => void;
};

export type RoomStatusType = "waiting" | "on game" | "finished";
