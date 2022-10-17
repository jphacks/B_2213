import { useContext } from "react";
import { GameContext } from "../../../../pages/game/playRoom/[roomId]";

// GameContextは<GameContextType | undefind>で定義しているためこのカスタムフックによるエラー処理が必要
export const useGameInfo = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
