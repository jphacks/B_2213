import styles from "../../../../../styles/Home.module.css";
type ShowActionProps = {
  showAction: Boolean;
  setShowAction: (showAction: Boolean) => void;
};
const ActionSelect = (props: ShowActionProps) => {
  const { showAction, setShowAction } = props;
  return (
    <div className={showAction ? styles.fadein : styles.fadeout}>
      <div className="bg-[#393939] rounded-t-lg text-center h-full pt-2">
        <div className="py-5">
          <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
            check
          </button>
          <button className="px-6 py-2 mx-8 border-gold-button transition-colors duration-300 transform rounded-md">
            bet
          </button>
          <button className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md">
            fold
          </button>
        </div>
        <h1 className="text-6xl py-5 sm:text-5xl capitalize tracking-widest lg:text-7xl">
          24
        </h1>
        <input id="range" type="range" className="flex w-10/12 mx-2 mt-2" />
        <button
          className="mt-8 px-6 py-2 bg-gold-button transition-colors duration-300 transform rounded-md"
          onClick={() => setShowAction(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionSelect;
