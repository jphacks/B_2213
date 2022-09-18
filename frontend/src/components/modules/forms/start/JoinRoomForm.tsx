import UserNameInput from "../../../atoms/form/start/UserNameInput";
import SendButton from "../../../atoms/form/start/SendButton";

const JoinRoomForm = () => {
  return (
    <div className="max-w-2xl text-center">
      <UserNameInput />

      <SendButton />
    </div>
  );
};

export default JoinRoomForm;
