import { Link } from "react-router-dom";
import { UserHandlers } from "../handlers/FromSubmitHandlers";
import useUserReducer from "../hooks/useUserReducer";
import useErrorState from "../hooks/useErrorState";
import { InputField } from "../components/Inputfield";
import { useEffect, useState } from "react";

function SignInPage() {
  const { handleUserLogin } = UserHandlers();
  const { email, password, setUserdata, isUserRemeberd } = useUserReducer();
  const { errorMessage, errorSet, refreshError } = useErrorState();
  const [rememberMe, setRememberMe] = useState(false);

  const userLoginSubmit = async (e) => {
    e.preventDefault();
    //If form is empty setError and return
    if (!email.trim() || !password.trim()) {
      errorSet("Please Enter Email and Password!");
      return;
    }
    // If Userinput get try Sign In
    try {
      await handleUserLogin({ email, password });
    } catch (err) {
      console.log("Error in LOGIN", err);
      errorSet(err);
    }
  };

  useEffect(() => {
    isUserRemeberd();
  }, []);

  // Remember me on check
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      localStorage.setItem("USERREMEBER", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("USERREMEBER");
    }
    return;
  };

  return (
    <div className="w-full">
      <div className="mt-8 text-4xl font-extrabold tracking-tight leading-tight text-slate-400">
        Sign in
      </div>
      <div className="flex items-baseline mt-0.5 font-medium text-white">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Don't have an account?</p>
        <Link
          to="/easyauth/register"
          className="ml-1 text-primary-500 hover:underline text-sky-400"
        >
          Sign up
        </Link>
      </div>

      {errorMessage && (
        <p
          key={refreshError}
          className="p-1 mt-4 bg-orange-500 text-white font-semibold rounded-md animate__animated animate__tada"
        >
          {errorMessage}
        </p>
      )}

      <form className="mt-8" onSubmit={(e) => userLoginSubmit(e)}>
        <InputField
          label={"Email address"}
          type={"email"}
          value={email}
          onChange={setUserdata("email")}
        />
        <InputField
          label={"Password"}
          type={"password"}
          value={password}
          onChange={setUserdata("password")}
        />

        <div className="inline-flex items-center justify-between w-full mt-1.5">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              className="form-checkbox text-primary-500"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <span className="ml-2">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="font-semibold text-sky-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button className="flex w-full items-center mt-8 justify-center bg-sky-600 p-4 rounded-full text-white font-semibold">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
