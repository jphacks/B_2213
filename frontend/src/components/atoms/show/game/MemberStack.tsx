import { useGameInfo } from "../../../hooks/game/useGameInfo";

const MemberStack = () => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const memberInfo = gameInfo.users;

  return (
    <div className="pt-8">
      <h1 className="text-3xl w-full">Stack of member</h1>
      <ul className="pl-2 pt-3">
        {Object.keys(memberInfo).map((key) => (
          <li className="pb-3 text-xl flex justify-between" key={key}>
            <p>{memberInfo[key].userName}</p>
            <p className="text-right">{memberInfo[key].stack}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberStack;
