import { NextPage } from "next";
import { createContext, useState } from "react";
import ActionSelect from "../../../src/components/Organisms/game/ActionSelect";
import PlayMenu from "../../../src/components/Organisms/game/PlayMenu";
import { GameContextType, GameInfoType } from "../../../src/types/game/type";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

const PlayRoom: NextPage = () => {
  const [showAction, setShowAction] = useState<Boolean>(false);
  const [gameInfo, setGameInfo] = useState<GameInfoType>({
    // モックデータ使わない時は()とからにしておく
    roomID: "",
    roomData: {
      round: 1,
      stage: 2,
      toCall: 100,
      sb: {
        user: "",
        amount: 50,
      },
      bb: {
        user: "",
        amount: 100,
      },
      pot: 100,
    },
    users: {
      Uasdfas: {
        userName: "",
        stack: 80,
        joining: false,
        bettingTips: 0,
        allIn: false,
        actioned: false,
        admin: false,
        sessionAlive: true,
      },
    },
  });

  return (
    <GameContext.Provider value={{ gameInfo, setGameInfo }}>
      <div className="bg-poker-color font-poker-color font-poker-family">
        <section className="h-screen bg-cover">
          <div className="flex w-full items-center justify-center container mx-auto px-8">
            <div className="max-w-2xl text-center">
              <PlayMenu
                {...{ showAction: showAction, setShowAction: setShowAction }}
              />
            </div>
          </div>

          <ActionSelect
            {...{ showAction: showAction, setShowAction: setShowAction }}
          />
        </section>
      </div>
    </GameContext.Provider>
  );
};

export default PlayRoom;
