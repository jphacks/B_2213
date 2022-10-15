import { useContext } from "react";
import { OptionsContext } from "../../../Organisms/game/SetOption";

const SendOptions = () => {
  const { options } = useContext(OptionsContext);

  return (
    <div className="pt-3 pb-8 z-10 absolute bottom-0 right-0 bg-poker-color">
      <button
        className="px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => console.log(options)}
      >
        Start
      </button>
    </div>
  );
};
export default SendOptions;
