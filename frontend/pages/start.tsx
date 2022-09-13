import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GameSelect from "../src/components/modules/select/start/GameSelect";
import StartTypeSelect from "../src/components/modules/select/start/StartTypeSelect";

const Start: NextPage = () => {
  const router = useRouter();

  let { user: u } = { user: "aa" };
  console.log(u);
  const [gameType, setGameType] = useState<string | null>(null);

  useEffect(() => {
    console.log(gameType);
  }, [gameType]);

  return (
    <section className="h-screen bg-cover bg-white">
      <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
        {gameType ? (
          <StartTypeSelect gameType={gameType} />
        ) : (
          <GameSelect setGameType={setGameType} />
        )}
      </div>
    </section>
  );
};

export default Start;
