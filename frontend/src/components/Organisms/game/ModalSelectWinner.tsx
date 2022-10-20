import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import SelectWinner from "../../modules/select/game/SelectWinner";
import Loading from "../../templates/Loading";

const ModalSelectWinner = () => {
  const { userInfo } = useContext(UserContext);

  if (userInfo.permission != "admin") {
    return <Loading />;
  }

  return <SelectWinner />;
};

export default ModalSelectWinner;
