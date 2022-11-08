type RoomIdStateType = {
  roomID: string;
  setRoomID: (roomID: string) => void;
};

const RoomIdInput = ({ roomID, setRoomID }: RoomIdStateType) => {
  const changeRoomID = (changeValue: string) => {
    if (changeValue.length <= 10) setRoomID(changeValue.toUpperCase());
  };
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl tracking-widest lg:text-4xl">
        room id
      </h1>

      <div className="mt-3">
        <input
          data-testid="roomid"
          name="roomid"
          value={roomID}
          onChange={(e) => changeRoomID(e.target.value)}
          type="text"
          className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default RoomIdInput;
