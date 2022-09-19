import { memo } from "react";

type RoomIdStateType = {
  room_id: string;
  setRoomId: (room_id: string) => void;
};

// メモ化により不必要な再描画をなくす
// eslint-disable-next-line react/display-name
const RoomIdInput = memo<RoomIdStateType>(({ room_id, setRoomId }) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl sm:text-4xl capitalize tracking-widest lg:text-4xl">
        Room ID
      </h1>

      <div className="mt-3">
        <input
          id="roomid"
          value={room_id}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
          autoComplete="off"
        />
      </div>
    </div>
  );
});

export default RoomIdInput;
