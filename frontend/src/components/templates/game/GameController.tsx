import { createContext, useContext, useState } from "react";
import { UserContext } from "../../../../pages/_app";
import { ShowDataType, UIControllContextType } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import ActionSelect from "../../Organisms/game/ActionSelect";
import GameData from "../../Organisms/game/GameData";
import ModalBBSB from "../../Organisms/game/ModalBBSB";
import ModalSelectWinner from "../../Organisms/game/ModalSelectWinner";
import PlayMenu from "../../Organisms/game/PlayMenu";

export const UIControllContext = createContext<UIControllContextType>({
  showAction: false,
  setShowAction: (showAction) => {},
  dataName: "bet",
  setDataName: (dataName) => {},
});

const GameController = () => {
  const { userInfo } = useContext(UserContext);
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const stage = gameInfo.roomData.stage;
  const [showAction, setShowAction] = useState<boolean>(false);
  const [dataName, setDataName] = useState<ShowDataType>("bet");
  const UIContextValue = { showAction, setShowAction, dataName, setDataName };

  return (
    <UIControllContext.Provider value={UIContextValue}>
      <div className="bg-poker-color font-poker-color font-poker-family">
        {stage == 0 ? (
          <ModalBBSB />
        ) : stage == 5 ? (
          <ModalSelectWinner />
        ) : (
          <section className="h-screen bg-cover">
            <div className="h-full w-full container mx-auto px-8 max-w-lg">
              <GameData />
              <PlayMenu />
            </div>

            <ActionSelect />
          </section>
        )}
      </div>
    </UIControllContext.Provider>
  );
};

export default GameController;
