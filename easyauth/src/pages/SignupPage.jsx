import { Link } from "react-router-dom";
import useUserReducer from "../hooks/useUserReducer";
import { InputField } from "../components/Inputfield";
import useErrorState from "../hooks/useErrorState";
import { UserHandlers } from "../handlers/FromSubmitHandlers";

function SignupPage() {
  const { username, email, password, newPassword, setUserdata } =
    useUserReducer();
  const { errorMessage, errorSet, refreshError } = useErrorState();
  const { handleUserRegister } = UserHandlers();

  const handleUserRegisterSubmit = async (e) => {
    e.preventDefault();

    // Empty field validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      errorSet("Please fill all the fields!");
      return;
    }
    // If password not Match return
    if (password !== newPassword) {
      errorSet("Password Didn't Match");
      return;
    }

    // Get User Data
    const newUserData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await handleUserRegister(newUserData);
    } catch (err) {
      console.log("Error in REGISTER");
      errorSet(err);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-8 text-4xl font-extrabold tracking-tight leading-tight text-slate-400">
        Sign up
      </div>
      <div className="flex items-baseline mt-0.5 font-medium text-white">
        <p>Already have an account?</p>
        <Link
          to="/easyauth/login"
          className="ml-1 text-primary-500 hover:underline text-sky-400"
        >
          Sign in
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

      <form className="mt-8" onSubmit={(e) => handleUserRegisterSubmit(e)}>
        <InputField
          label={"Email address"}
          type={"email"}
          value={email}
          onChange={setUserdata("email")}
        />
        <InputField
          label={"Username*"}
          type={"text"}
          value={username}
          onChange={setUserdata("username")}
        />
        <InputField
          label={"Password"}
          type={"password"}
          value={password}
          onChange={setUserdata("password")}
        />
        <InputField
          label={"Confirm Password"}
          type={"password"}
          value={newPassword}
          onChange={setUserdata("newPassword")}
        />

        <button className="flex w-full items-center mt-8 justify-center bg-sky-600 p-4 rounded-full text-white font-semibold">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
