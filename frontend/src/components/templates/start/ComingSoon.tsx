import { SetGameProps } from "../../../types/game/type";

// mahjong機能ができるまでの案内ページ
const ComingSoon = ({ setGameType }: SetGameProps) => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl mb-10 capitalize tracking-widest">
              Coming Soon...!
            </h1>
            <div className="flex justify-center">
              <h1
                className="text-2xl border-b-2 border-[#95913f]"
                onClick={() => setGameType(null)}
              >
                Go to start page
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
