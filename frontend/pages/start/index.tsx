import { NextPage } from "next";
import { useState } from "react";
import BackGameSelect from "../../src/components/atoms/transition/start/BackGameSelect";
import GameSelect from "../../src/components/modules/select/start/GameSelect";
import StartTypeSelect from "../../src/components/modules/select/start/StartTypeSelect";

const Start: NextPage = () => {
  const [gameType, setGameType] = useState<string | null>(null);

  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          {gameType ? (
            <div>
              <BackGameSelect setGameType={setGameType} />
              <StartTypeSelect gameType={gameType} />
            </div>
          ) : (
            <GameSelect setGameType={setGameType} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Start;
