import { ShowActionProps } from "../../../types/game/type";
import { useGameInfo } from "../../hooks/game/useGameInfo";
import ActionSelect from "../../Organisms/game/ActionSelect";
import GameData from "../../Organisms/game/GameData";
import ModalBBSB from "../../Organisms/game/ModalBBSB";
import PlayMenu from "../../Organisms/game/PlayMenu";

const GameController = ({ showAction, setShowAction }: ShowActionProps) => {
  const { gameInfo } = useGameInfo(); //undefind回避のcontextのカスタムフック
  const stage = gameInfo.roomData.stage;
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      {stage == 0 ? (
        <ModalBBSB />
      ) : (
        <section className="h-screen bg-cover">
          <div className="h-full w-full container mx-auto px-8 max-w-lg">
            <GameData />
            <PlayMenu
              {...{ showAction: showAction, setShowAction: setShowAction }}
            />
          </div>

          <ActionSelect
            {...{ showAction: showAction, setShowAction: setShowAction }}
          />
        </section>
      )}
    </div>
  );
};

export default GameController;
