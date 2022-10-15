import { memo } from "react";

// eslint-disable-next-line react/display-name
const BackWaitRoom = memo<{ setShowOption: (showOption: boolean) => void }>(
  ({ setShowOption }) => {
    return (
      <h1
        className="text-2xl z-10 absolute top-5 left-5"
        onClick={() => setShowOption(false)}
      >
        back
      </h1>
    );
  }
);

export default BackWaitRoom;
