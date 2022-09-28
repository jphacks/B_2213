export type UserInfoType = {
  userId: string | null;
  roomId: string | null;
  userName: string | null;
  permission: string | null;
  gameType?: string;
};

export type UserContextType = {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
};
