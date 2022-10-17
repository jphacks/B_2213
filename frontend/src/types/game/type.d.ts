export type GameProps = {
  gameType: string;
};

export type SetGameProps = {
  setGameType: (gameType: string | null) => void;
};

export type RoomStatusType = "waiting" | "on game" | "finished";

export type RoomDataType = {
  round: number;
  stage: number;
  toCall: number;
  sb: {
    user: string;
    amount: number;
  };
  bb: {
    user: string;
    amount: number;
  };
  pot: number;
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

export type MemberContextType = {
  memberInfo: MemberInfoType;
  setMemberInfo: (memberInfo: MemberInfoType) => void;
};

export type GameInfoType = {
  roomID: string;
  roomData: RoomDataType;
  users: MemberInfoType;
};

export type GameContextType = {
  gameInfo: GameInfoType;
  setGameInfo: (gameInfo: GameInfoType) => void;
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

export type ActionInfoType = {
  canActions: string[];
  selectedAction: number;
  willBet: number;
};

export type ActionInfoProps = {
  actionInfo: ActionInfoType;
  setActionInfo: (actionInfo: ActionInfoType) => void;
};
