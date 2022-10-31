import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import MemberResult from "../../atoms/show/game/MemberResult";
import MyResult from "../../atoms/show/game/MyResult";
import { useGameInfo } from "../../hooks/game/useGameInfo";
type PropsType = {
  setShowResult: (showResult: boolean) => void;
};

const Result = ({ setShowResult }: PropsType) => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const memberInfo = gameInfo.users;

  return (
    <div className="w-screen bg-poker-color z-50 absolute top-0 left-0">
      <section className="h-screen bg-cover">
        <div className="h-full w-full container mx-auto px-8 max-w-lg">
          <h1 className="text-4xl pt-8 pb-1 w-full">Result</h1>

          <MyResult />

          <MemberResult />

          <div className="text-center pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10">
            <button
              className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md"
              onClick={() => setShowResult(false)}
            >
              Close Result
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Result;
