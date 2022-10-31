type PropsType = {
  handleSendButton: () => void;
  typeName: string;
  css: string;
};

const GeneralButton = ({ handleSendButton, typeName, css }: PropsType) => {
  return (
    <button
      onClick={() => handleSendButton()}
      className={
        "px-6 py-2 transition-colors duration-300 transform rounded-md " + css
      }
    >
      {typeName}
    </button>
  );
};

export default GeneralButton;
