import axios from "axios";
import { useRouter } from "next/router";
import { memo, useContext, useEffect, useState } from "react";
import { MemberContext } from "../../../../pages/game/waitRoom/[roomId]";
import { UserContext } from "../../../../pages/_app";

type PropType = {
  round: number;
  setShowOption: (showOption: boolean) => void;
};

// eslint-disable-next-line react/display-name
const StartQuitRoom = memo<PropType>(({ round, setShowOption }) => {
  const { userInfo } = useContext(UserContext);
  const { memberInfo } = useContext(MemberContext);
  const [showOnlyAdmin, setShowOnlyAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowOnlyAdmin(memberInfo[userInfo.userID!].admin);

    if (round > 0) {
      // roundが0から変わると全員がplayRoomへ移動する。
      router.push("/game/playRoom/" + userInfo.roomID);
      return;
    }
  }, [round]);

  const quitRoom = async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL +
        "/api/ingame/" +
        userInfo.roomID +
        "/quitGame?userID=" +
        userInfo.userID;
      await axios.post(apiUrl);

      router.push("/start");
      return;
    } catch (e) {
      return;
    }
  };

  return (
    <div className="pt-3 pb-20 w-full z-10 absolute bottom-0 left-0 lg:pb-10 bg-poker-color">
      <button
        className="px-6 py-2 mr-2 border-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => quitRoom()}
      >
        Quit Room
      </button>
      {showOnlyAdmin ? (
        <button
          className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => setShowOption(true)}
        >
          Set Options
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default StartQuitRoom;
