import { Outlet, Navigate } from "react-router-dom";
import "../../styles/authLayout.css";

import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { currentUser } = useSelector((state) => state.user);

  const userID = currentUser && currentUser.data && currentUser.data.user ? currentUser.data.user._id : null;

  const isAuthenticated = !!userID;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="authContainer">
          <section className="authComponentContainer">
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
}
