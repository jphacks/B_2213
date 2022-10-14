import { useRouter } from "next/router";

const BackStartPage = ({ gameType }: { gameType: string }) => {
  const router = useRouter();

  const handleBackButton = () => {
    // URLに含まずにqueryとして値を渡す
    router.push(
      { pathname: "/start", query: { gameType: gameType } },
      "/start"
    );
  };

  return (
    <h1
      onClick={() => handleBackButton()}
      className="text-2xl z-10 absolute top-5 left-5"
    >
      back
    </h1>
  );
};

export default BackStartPage;
