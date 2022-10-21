import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
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

          <div className="text-center mt-8 py-4 border-2 border-gold rounded-md">
            <h1 className="text-4xl w-full">My Result</h1>
            <h1 className="text-3xl pt-2 w-full">
              {memberInfo[userInfo.userID!].stack}
            </h1>
          </div>

          <div className="pt-8">
            <h1 className="text-3xl w-full">Results of member</h1>
            <ul className="pl-2 pt-3">
              {Object.keys(memberInfo).map((key) => (
                <li className="pb-3 text-xl flex justify-between" key={key}>
                  <p>{memberInfo[key].userName}</p>
                  <p className="text-right">{memberInfo[key].stack}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10">
            <button
              className="px-6 py-2 mr-2 border-gold-button transition-colors duration-300 transform rounded-md"
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
