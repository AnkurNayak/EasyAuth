import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//LoadingSpinner
import LoadinSpinner from "./components/spinner";
import { AuthProvider } from "./context/AppContext";
import ProtectedRoute from "./pages/ProtectedRoute";
//pages lazy loading
const SignInPage = lazy(() => import("./pages/SignInPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const HomePage = lazy(() => import("./pages/HomePage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col">
        <div className="flex-1 flex w-full h-full">
          <Router>
            <Suspense fallback={<LoadinSpinner />}>
              <Routes>
                <Route path="/easyauth" element={<HomePage />}>
                  <Route index element={<Navigate replace to="register" />} />
                  <Route path="login" element={<SignInPage />} />
                  <Route path="register" element={<SignupPage />} />
                </Route>
                <Route
                  path="easyauth/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
        <div className="text-white flex items-center justify-center">
          © 2024 ankur1nayak@gmail.com. All rights reserved
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
