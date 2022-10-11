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

export type RoomDataType = {
  pot: {
    main: number;
    sub?: number | null;
  };
  round: number;
  stage: number;
  roomID: string;
};

export type UserGameType = {
  actioned: boolean;
  admin: boolean;
  allIn: boolean;
  bettingTips: number;
  joining: boolean;
  sessionAlive: boolean;
  stack: number;
  userName: string;
};

export type MemberInfoType = {
  [key: string]: UserGameType;
};

export type GameInfoType = {
  RoomData: RoomDataType;
  users: MemberInfoType;
};
