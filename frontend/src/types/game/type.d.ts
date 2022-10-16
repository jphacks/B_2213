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
  roomData: RoomDataType;
  users: MemberInfoType;
};

export type MemberContextType = {
  memberInfo: MemberInfoType;
  setMemberInfo: (memberInfo: MemberInfoType) => void;
};

export type OptionsType = {
  stacks: {
    [key: string]: number;
  };
  bb: number;
  sb: number;
};

export type OptionsContextType = {
  options: OptionsType;
  setOptions: (options: OptionsType) => void;
};
