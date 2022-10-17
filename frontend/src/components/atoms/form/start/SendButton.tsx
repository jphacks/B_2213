const SendButton = ({ handleSendButton }: { handleSendButton: () => void }) => {
  return (
    <div className="mt-20">
      <button
        onClick={() => handleSendButton()}
        className="px-6 py-2 border-gold-button transition-colors duration-300 transform rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default SendButton;
