import { useReducer } from "react";

const useUserReducer = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SETUSERDATA":
        return { ...state, [action.data]: action.payload };
      case "SETUSERDATAFOREDIT":
        return {
          ...state,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          newPassword: "",
        };
      case "USERREMEMBERED":
        return {
          ...state,
          email: action.payload.email,
          password: action.payload.password,
        };
      default:
        throw new Error("Unknown Action");
    }
  };
  const initialValue = {
    username: "",
    email: "",
    password: "",
    newPassword: "",
  };

  const [{ username, email, password, newPassword }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  const setUserdata = (data) => (e) =>
    dispatch({ type: "SETUSERDATA", data, payload: e.target.value });

  const getUserDataForEdit = (data) =>
    dispatch({ type: "SETUSERDATAFOREDIT", payload: data });

  const isUserRemeberd = () => {
    const isUserStored = JSON.parse(localStorage.getItem("USERREMEBER"));
    if (isUserStored !== null) {
      dispatch({ type: "USERREMEMBERED", payload: isUserStored });
    }
    return;
  };

  return {
    username,
    email,
    password,
    newPassword,
    setUserdata,
    getUserDataForEdit,
    isUserRemeberd,
  };
};

export default useUserReducer;
