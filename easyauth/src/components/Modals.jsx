/* eslint-disable react/prop-types */
import { UserHandlers } from "../handlers/FromSubmitHandlers";
import useErrorState from "../hooks/useErrorState";
import useUserReducer from "../hooks/useUserReducer";

// Input form
// eslint-disable-next-line react/prop-types
function InputForm({ label, type, placeholder, value, onChange }) {
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full focus:border-indigo-600 focus:outline-none border border-slate-600"
          value={value}
          onChange={onChange}
          // required
        />
      </label>
    </>
  );
}

//Logout Modal
function LogoutModal() {
  const { handleUserLogout } = UserHandlers();
  return (
    <>
      <button
        className="bg-gray-500 p-1 rounded-full text-white font-semibold w-full"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Logout
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4 flex justify-center font-semibold text-md">
            You are about to be logged out!
          </p>
          <span className="flex justify-center">
            <button
              className=" bg-slate-500 text-white p-2 rounded-full"
              onClick={() => handleUserLogout()}
            >
              Logout
            </button>
          </span>
        </div>
      </dialog>
    </>
  );
}

//Delete Modal
function DeleteModal() {
  const { handleUserDelete } = UserHandlers();
  // Add errorMessage if required. Not necessary for now. Add if password required
  // const { errorMessage,errorSet} = useErrorState();

  // Function Delete User
  const handleUserDeleteSubmit = async () => {
    try {
      await handleUserDelete();
    } catch (err) {
      console.log("Error in DELETE USER");
      // errorSet(err)
    }
  };

  return (
    <>
      <button
        className="bg-red-500 p-1 rounded-full text-white font-semibold w-full"
        onClick={() => document.getElementById("deletemodal").showModal()}
      >
        Delete Account
      </button>
      <dialog id="deletemodal" className="modal">
        <div className="modal-box">
          <p className="py-4 font-semibold flex justify-center">
            Are you sure you want to delete your account?
          </p>
          <div className="modal-action justify-between">
            <button
              className="p-2 rounded-full bg-red-500 text-white font-semibold"
              onClick={() => handleUserDeleteSubmit()}
            >
              Delete Account
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="p-2 rounded-full bg-slate-500 text-white font-semibold">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditModal({ onUserUpdate, userProfile }) {
  const { handleUserUpdate } = UserHandlers();
  const {
    username,
    email,
    password,
    newPassword,
    setUserdata,
    getUserDataForEdit,
  } = useUserReducer();

  const { errorMessage, errorSet, refreshError } = useErrorState();

  // After open the Form Patch userProfile to form
  const openEditForm = () => {
    document.getElementById("editmodal").showModal();
    getUserDataForEdit(userProfile);
  };

  const handleUserUpdateOnSubmit = async (e) => {
    e.preventDefault();
    // Get New User Data for handleUpdate
    const newUserData = {
      username: username,
      email: email,
      password: password,
      newpassword: newPassword,
    };
    try {
      await handleUserUpdate(newUserData);
      onUserUpdate();
      document.getElementById("editmodal").close();
    } catch (err) {
      console.log("Error in UPDATE", err);
      errorSet(err);
    }
  };

  return (
    <>
      <button
        className="bg-sky-500 p-1 rounded-full text-white font-semibold w-full"
        onClick={() => {
          openEditForm();
        }}
      >
        Edit Profile
      </button>
      <dialog id="editmodal" className="modal">
        <div className="modal-box">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-slate-600">
              Edit User Profile*
            </h3>
            {errorMessage && (
              <p
                key={refreshError}
                className="p-1 max-w-xs bg-orange-500 text-white font-semibold rounded-md animate__animated animate__tada"
              >
                {errorMessage}
              </p>
            )}
          </div>
          <form
            className="py-4 font-semibold"
            onSubmit={handleUserUpdateOnSubmit}
          >
            <InputForm
              label={"Username*"}
              type={"text"}
              placeholder={"Enter Username"}
              value={username}
              onChange={setUserdata("username")}
            />
            <InputForm
              label={"Email*"}
              type={"email"}
              placeholder={"Enter Email"}
              value={email}
              onChange={setUserdata("email")}
            />
            <InputForm
              label={"Current Password*"}
              type={"text"}
              placeholder={"Enter Password"}
              value={password}
              onChange={setUserdata("password")}
            />
            <InputForm
              label={"New Password*"}
              type={"password"}
              placeholder={"Enter Password"}
              value={newPassword}
              onChange={setUserdata("newPassword")}
            />
            <div className="justify-between flex mt-4">
              <button className="p-2 rounded-full bg-sky-500 text-white font-semibold">
                Update user
              </button>
            </div>
          </form>
          <button
            className="p-2 rounded-full bg-slate-500 text-white font-semibold"
            onClick={() => document.getElementById("editmodal").close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export { LogoutModal, DeleteModal, EditModal };
