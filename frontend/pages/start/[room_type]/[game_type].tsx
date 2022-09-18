import { NextPage } from "next";
import { useRouter } from "next/router";

const JoinRoom: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl capitalize tracking-widest lg:text-4xl">
              user name
            </h1>

            <div className="mt-3">
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="mt-20">
              <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinRoom;
