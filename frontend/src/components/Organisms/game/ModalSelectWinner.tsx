import { useContext } from "react";
import { UserContext } from "../../../../pages/_app";
import SelectWinner from "../../modules/select/game/SelectWinner";
import HostOperationLoading from "../../templates/game/HostOperationLoading";

const ModalSelectWinner = () => {
  const { userInfo } = useContext(UserContext);

  if (userInfo.permission != "admin") {
    return <HostOperationLoading />;
  }

  return <SelectWinner />;
};

export default ModalSelectWinner;
