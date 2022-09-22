import { memo } from "react";

type UserStateType = {
  user_name: string;
  setUserName: (user_name: string) => void;
};

// メモ化により不必要な再描画をなくす
// eslint-disable-next-line react/display-name
const UserNameInput = memo<UserStateType>(({ user_name, setUserName }) => {
  // 十文字制限
  const changeUserName = (changeValue: string) => {
    if (changeValue.length <= 10) setUserName(changeValue);
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl capitalize tracking-widest lg:text-4xl">
        user name
      </h1>

      <div className="mt-3">
        <input
          id="username"
          type="text"
          value={user_name}
          onChange={(e) => changeUserName(e.target.value)}
          className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
          autoComplete="off"
        />
      </div>
    </div>
  );
});

export default UserNameInput;