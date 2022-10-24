import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BackGameSelect from "../../src/components/atoms/transition/start/BackGameSelect";
import GameSelect from "../../src/components/modules/select/start/GameSelect";
import StartTypeSelect from "../../src/components/modules/select/start/StartTypeSelect";
import ComingSoon from "../../src/components/templates/start/ComingSoon";

const Start: NextPage = () => {
  // queryにgameTypeの値があれば使用。
  // 違うページから遷移してきた場合にgameTypeの値をqueryに持していることがあるため。
  const router = useRouter();
  // gameTypeにstring[]がないことを強制させる
  const gameType_from_query = (router.query.gameType ?? null) as string | null;

  const [gameType, setGameType] = useState(gameType_from_query);

  // mahjongの機能はまだ実装していないためComing soon ページへ飛ばす
  if (gameType == "mahjong") {
    return <ComingSoon setGameType={setGameType} />;
  }

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
