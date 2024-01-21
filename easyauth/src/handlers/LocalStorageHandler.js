const localStorageHandler = () => {
  const { userId, token, password } = JSON.parse(
    localStorage.getItem("LOGINSTATUS")
  );
  return { userId, token, password };
};

export default localStorageHandler;
