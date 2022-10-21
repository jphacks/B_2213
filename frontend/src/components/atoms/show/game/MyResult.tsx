import { useContext } from "react";
import { UserContext } from "../../../../../pages/_app";
import { useGameInfo } from "../../../hooks/game/useGameInfo";

const MyResult = () => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const memberInfo = gameInfo.users;

  return (
    <div className="text-center mt-8 py-4 border-2 border-gold rounded-md">
      <h1 className="text-4xl w-full">My Result</h1>
      <h1 className="text-3xl pt-2 w-full">
        {memberInfo[userInfo.userID!].stack}
      </h1>
    </div>
  );
};

export default MyResult;
