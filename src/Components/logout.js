import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import signOut function
import Cookies from "js-cookie";
import { auth } from "./firebase";
import { notification } from "antd"; // Optional, to show a success message

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth); // Firebase sign out
        Cookies.remove("authToken");
        notification.success({
          message: "Logged Out",
          description: "You have successfully logged out.",
          placement: "topRight",
        });
        navigate("/login"); // Redirect to the login page after logout
      } catch (error) {
        console.error("Logout error:", error);
        notification.error({
          message: "Logout Failed",
          description:
            "There was an error while logging you out. Please try again.",
          placement: "topRight",
        });
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
};

export default Logout;
