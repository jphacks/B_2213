const HostOperationLoading = () => {
  return (
    <div className="bg-poker-color font-poker-color font-poker-family">
      <section className="h-screen bg-cover">
        <div className="flex h-full w-full items-center justify-center container mx-auto px-8">
          <div className="max-w-2xl text-center">
            <h1 className="mb-10 capitalize tracking-widest">
              <p className="text-5xl">Host</p>
              <p className="text-3xl">is</p>
              <p className="text-5xl">operating...</p>
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

export default HostOperationLoading;
