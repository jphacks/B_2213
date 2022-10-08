import { memo } from "react";

// eslint-disable-next-line react/display-name
const WaitMemberList = memo(() => {
  return (
    <ul className="pt-8 text-2xl capitalize tracking-widest border-t-2 border-[#95913f]">
      <li className="pb-3">Hasegawa Akito</li>
      <li className="pb-3">Tano</li>
      <li className="pb-3">Hujithiy</li>
    </ul>
  );
});

export default WaitMemberList;
