import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkAdmin } from "../../api/userApi";

const RequireAdmin = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");
      const localUser = JSON.parse(localStorage.getItem("user") || "null");
      const isLocalAdmin = Number(localUser?.role) === 1;

      if (!token) {
        setIsAllowed(false);
        setIsChecking(false);
        return;
      }

      try {
        await checkAdmin();
        setIsAllowed(true);
      } catch (error) {
        const status = error?.response?.status;
        const isNetworkOrCorsError = !error?.response;

        // Keep strict deny for explicit unauthorized responses.
        if (status === 401 || status === 403) {
          setIsAllowed(false);
          return;
        }

        // Do not block valid local admin for routing/CORS/network mismatch.
        if ((status === 404 || isNetworkOrCorsError) && isLocalAdmin) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } finally {
        setIsChecking(false);
      }
    };

    verifyAdmin();
  }, [location.pathname]);

  if (isChecking) {
    return null;
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;