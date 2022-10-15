import { memo, useContext, useEffect, useRef, useState } from "react";
import { MemberContext } from "../../../../../pages/game/waitRoom/[roomId]";
import { UserContext } from "../../../../../pages/_app";

// eslint-disable-next-line react/display-name
const WaitingMember = memo(() => {
  const { memberInfo, setMemberInfo } = useContext(MemberContext);

  return (
    <ul className="pt-8 text-2xl capitalize tracking-widest border-t-2 border-[#95913f]">
      {Object.keys(memberInfo).map((key) => (
        <li key={key}>{memberInfo[key].userName}</li>
      ))}
    </ul>
  );
});

export default WaitingMember;
