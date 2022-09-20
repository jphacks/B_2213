const Loading = () => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl mb-10 sm:text-5xl capitalize tracking-widest lg:text-7xl">
              Loading...
            </h1>
            <div className="flex justify-center">
              <div className="animate-spin h-10 w-10 border-4 border-[#95913f] rounded-full border-t-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
