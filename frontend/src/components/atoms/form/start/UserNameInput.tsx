const UserNameInput = () => {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl capitalize tracking-widest lg:text-4xl">
        user name
      </h1>

      <div className="mt-3">
        <input
          id="username"
          type="text"
          className="block w-full px-4 py-2 mt-2 bg-poker-color rounded-md border-gold focus:outline-none"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default UserNameInput;
