import axios from "axios";
import { useRouter } from "next/router";
import { memo, useContext, useEffect, useState } from "react";
import { MemberContext } from "../../../../pages/game/waitRoom/[roomId]";
import { UserContext } from "../../../../pages/_app";
import GeneralButton from "../../atoms/form/start/GeneralButton";

type PropType = {
  round: number;
  setShowOption: (showOption: boolean) => void;
};

const StartQuitRoom = ({ round, setShowOption }: PropType) => {
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
      <GeneralButton
        handleSendButton={() => quitRoom()}
        typeName="Quit Room"
        css="border-gold-button mx-1"
      />

      {showOnlyAdmin ? (
        <GeneralButton
          handleSendButton={() => setShowOption(true)}
          typeName="Set Options"
          css="bg-gold-button mx-1"
        />
      ) : null}
    </div>
  );
};

export default StartQuitRoom;
