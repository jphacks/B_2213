import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";
import RoomIdInput from "../../../atoms/form/start/RoomIdInput";

const JoinRoomForm = () => {
  return (
    <div className="max-w-2xl text-center">
      <UserNameInput />
      <RoomIdInput />
      <SendButton />
    </div>
  );
};

export default JoinRoomForm;
