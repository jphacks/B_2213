import { useContext } from "react";
import { GameContext } from "../../../../pages/game/playRoom/[roomID]";

// GameContextは<GameContextType | undefind>で定義しているためこのカスタムフックによるエラー処理が必要
// stateも初期値を設定しておらずundefindであるためそのエラー処理を行う
export const useGameInfo = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  const { gameInfo, setGameInfo } = context;

  if (gameInfo === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  if (setGameInfo === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return { gameInfo, setGameInfo };
};
