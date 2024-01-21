import { useEffect, useState } from "react";
import UserProfileImg from "../assets/userprofile.png";
import { DeleteModal, EditModal, LogoutModal } from "../components/Modals";
import { UserHandlers } from "../handlers/FromSubmitHandlers";
import useErrorState from "../hooks/useErrorState";

function UserProfile() {
  const { handleUserProfile } = UserHandlers();
  const [userProfile, setUserProfile] = useState(null);
  // Set if user Updated then use useEffect
  const [userUpdated, setUserUpdated] = useState(false);
  const switchUserUpdate = () => setUserUpdated(true);
  // Get Error Message
  const { errorMessage, errorSet, refreshError } = useErrorState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await handleUserProfile(setUserProfile);
      } catch (err) {
        errorSet(err);
      }
    };
    fetchUserProfile();
  }, [userUpdated]);

  return (
    <div className="max-w-3xl mx-auto mt-10 min-h-96 p-6 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-16 w-16 rounded-full"
            src={UserProfileImg}
            alt="Profile"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {userProfile?.username}!
          </h2>
          <p className="text-sm text-gray-600">{userProfile?.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Information Card 1 */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
            <p className="text-sm text-gray-700">
              You can display additional user information here.
            </p>
          </div>

          {/* Information Card 2 */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Activity Log</h3>
            <p className="text-sm text-gray-700">
              Display user activity or recent actions here.
            </p>
          </div>

          {/* Information Card 3 */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <ul className="space-y-2 flex flex-col w-full">
              <li>
                <EditModal
                  onUserUpdate={switchUserUpdate}
                  userProfile={userProfile}
                />
              </li>
              <li>
                <DeleteModal />
              </li>
              <li>
                <LogoutModal />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {errorMessage && (
        <p
          key={refreshError}
          className="p-1 mt-4 bg-orange-500 text-white font-semibold rounded-md animate__animated animate__tada"
        >
          {errorMessage}
        </p>
      )}
      {userUpdated && (
        <p className="p-1 mt-4 bg-green-500 text-white font-semibold rounded-md animate__animated animate__fadeInLeft">
          User Updated SuccessFully
        </p>
      )}
    </div>
  );
}

export default UserProfile;
