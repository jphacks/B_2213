import type { GameProps } from "../../../../types/game/type";
import SelectTag from "../../../atoms/transition/start/SelectTag";
import { useRouter } from "next/router";

const StartTypeSelect = ({ gameType }: GameProps) => {
  const router = useRouter();
  const moveInputNamePage = (startType: string) => {
    router.push("/start/" + startType + "/" + gameType);
  };
  return (
    <div className="max-w-2xl text-center">
      <div onClick={() => moveInputNamePage("createRoom")}>
        <SelectTag tagName={"New Room"} />
      </div>

      <div onClick={() => moveInputNamePage("joinRoom")}>
        <SelectTag tagName={"Join Room"} />
      </div>
    </div>
  );
};

export default StartTypeSelect;
