export type UserInfoType = {
  userID: string | null;
  roomID: string | null;
  userName: string | null;
  permission: string | null;
  gameType?: string;
};

export type UserContextType = {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
};
