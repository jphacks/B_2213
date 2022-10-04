const ShowRoomId = () => {
  return (
    <div className="py-6 tracking-widest flex flex-row">
      <button
        className="px-2 py-1 border-gold-button transition-colors duration-300 transform rounded-md"
        onClick={() => navigator.clipboard.writeText("aaaaaaaa")} // roomIDをコピー
        // ^^^^^^ 今後当たられたidをコピーするようする
      >
        copy
      </button>
      <h1 className="flex justify-center items-center ml-5 text-2xl sm:text-3xl">
        Id : aaaaaaaa
      </h1>
    </div>
  );
};

export default ShowRoomId;
