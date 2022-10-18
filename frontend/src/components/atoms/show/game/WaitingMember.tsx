import { useContext } from "react";
import { MemberContext } from "../../../../../pages/game/waitRoom/[roomID]";

const WaitingMember = () => {
  const { memberInfo, setMemberInfo } = useContext(MemberContext);

  return (
    <ul className="pt-8 text-2xl capitalize tracking-widest border-t-2 border-[#95913f]">
      {Object.keys(memberInfo).map((key) => (
        <li key={key}>{memberInfo[key].userName}</li>
      ))}
    </ul>
  );
};

export default WaitingMember;
