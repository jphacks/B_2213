import CreateRoomLink from "../../../atoms/link/start/CreateRoomLink";
import JoinRoomLink from "../../../atoms/link/start/JoinRoomLink";
import type { GameProps } from "../../../../types/game/type";

const StartTypeSelect = (props: GameProps) => {
  return (
    <div className="max-w-2xl text-center">
      <CreateRoomLink {...props} />
      <JoinRoomLink {...props} />
    </div>
  );
};

export default StartTypeSelect;
