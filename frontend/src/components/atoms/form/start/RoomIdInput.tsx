import { memo } from "react";

type RoomIdStateType = {
  roomID: string;
  setRoomID: (roomID: string) => void;
};

// メモ化により不必要な再描画をなくす
// eslint-disable-next-line react/display-name
const RoomIdInput = memo<RoomIdStateType>(({ roomID, setRoomID }) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl sm:text-4xl capitalize tracking-widest lg:text-4xl">
        room id
      </h1>

      <div className="mt-3">
        <input
          data-testid="roomid"
          name="roomid"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          type="text"
          className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
          autoComplete="off"
        />
      </div>
    </div>
  );
});

export default RoomIdInput;
