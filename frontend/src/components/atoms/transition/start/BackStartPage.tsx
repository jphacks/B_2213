import { useRouter } from "next/router";

const BackStartPage = ({ game_type }: { game_type: string }) => {
  const router = useRouter();

  const handleBackButton = () => {
    // URLに含まずにqueryとして値を渡す
    router.push(
      { pathname: "/start", query: { game_type: game_type } },
      "/start"
    );
  };

  return (
    <h1
      onClick={() => handleBackButton()}
      className="text-2xl sm:text-2xl lg:text-3xl z-10 absolute top-5 left-5"
    >
      back
    </h1>
  );
};

export default BackStartPage;
