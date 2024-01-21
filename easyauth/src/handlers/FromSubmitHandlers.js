import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import localStorageHandler from "./LocalStorageHandler";

export const UserHandlers = () => {
  const { initialdispatch } = useAuth();
  const navigate = useNavigate();

  // New User Register
  const handleUserRegister = async (newUserData) => {
    await axios.post("http://localhost:3000/api/users/register", newUserData);
    alert("User Created Successfully! LOGIN to check");
    navigate("/easyauth");
  };
  // User Login
  const handleUserLogin = async ({ email, password }) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/signin",
      {
        email,
        password,
      }
    );
    // Set LocalStorage, Navigate to dashboard
    const storeResponse = {
      userId: response.data.userId,
      token: response.data.token,
      password: password,
    };
    initialdispatch({ type: "LOGIN", payload: storeResponse });
    localStorage.setItem("LOGINSTATUS", JSON.stringify(storeResponse));
    navigate("/easyauth/dashboard");
  };

  // Put this in useEffect hook in UserProfile
  const handleUserProfile = async (setUserProfile) => {
    const { userId, token, password } = localStorageHandler();
    const response = await axios.get(
      "http://localhost:3000/api/users/user/" + userId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.statusText === "OK") {
      // Wrap user Info
      const userInfo = {
        username: response.data.username,
        email: response.data.email,
        id: response.data._id,
        password: password,
      };
      setUserProfile(userInfo);
    }
  };

  // Update user
  const handleUserUpdate = async (newUserData) => {
    const { userId, token } = localStorageHandler();
    // console.log(newUserData);
    await axios.put(
      "http://localhost:3000/api/users/update/" + userId,
      newUserData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  const handleUserDelete = async () => {
    const { userId, token } = localStorageHandler();
    await axios.delete(
      "http://localhost:3000/api/users/user/delete/" + userId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // Logout after delete
    handleUserLogout();
  };

  // User Logout
  const handleUserLogout = () => {
    initialdispatch({ type: "LOGOUT" });
    localStorage.removeItem("LOGINSTATUS");
  };

  return {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
    handleUserProfile,
    handleUserUpdate,
    handleUserDelete,
  };
};
