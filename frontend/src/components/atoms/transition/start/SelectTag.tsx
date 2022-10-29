const SelectTag = ({ tagName }: { tagName: string }) => {
  return (
    <div className="mb-20 capitalize tracking-widest flex justify-center items-center">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl">{tagName}</h1>
      <div className="ml-3 right-arrow"></div>
    </div>
  );
};

export default SelectTag;
