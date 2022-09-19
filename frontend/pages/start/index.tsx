import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BackGameSelect from "../../src/components/atoms/transition/start/BackGameSelect";
import GameSelect from "../../src/components/modules/select/start/GameSelect";
import StartTypeSelect from "../../src/components/modules/select/start/StartTypeSelect";

const Start: NextPage = () => {
  // queryにgame_typeの値があれば使用。
  // 違うページから遷移してきた場合にgame_typeの値をqueryに持していることがあるため。
  const router = useRouter();
  // game_typeにstring[]がないことを強制させる
  const game_type = (router.query.game_type ?? null) as string | null;

  const [gameType, setGameType] = useState<string | null>(game_type);

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
