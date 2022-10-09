import { memo, useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/display-name
const WaitingMember = memo(() => {
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    socketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL + "/simpleWs"
    );
    console.log(socketRef);
    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log("Connected");
    };

    socketRef.current.onclose = function () {
      console.log("closed");
      setIsConnected(false);
    };
  }, []);
  return (
    <ul className="pt-8 text-2xl capitalize tracking-widest border-t-2 border-[#95913f]">
      <li className="pb-3">Hasegawa Akito</li>
      <li className="pb-3">Tano</li>
      <li className="pb-3">Hujithiy</li>
    </ul>
  );
});

export default WaitingMember;
