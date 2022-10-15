import { memo, useContext, useEffect, useRef, useState } from "react";
import { MemberContext } from "../../../../../pages/game/waitRoom/[roomId]";
import { UserContext } from "../../../../../pages/_app";

// eslint-disable-next-line react/display-name
const StartQuitRoomButton = memo(() => {
  const { userInfo } = useContext(UserContext);
  const { memberInfo } = useContext(MemberContext);
  const [showOnlyAdmin, setShowOnlyAdmin] = useState(false);

  useEffect(() => {
    setShowOnlyAdmin(memberInfo[userInfo.userID!].admin);
  }, []);

  return (
    <div className="pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
      <button className="px-6 py-2 mr-2 border-gold-button transition-colors duration-300 transform rounded-md">
        Quit Room
      </button>
      {showOnlyAdmin ? (
        <button className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md">
          Start Room
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default StartQuitRoomButton;
