import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//logout 컴포넌트
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://localhost:3001/logout", {
          method: "POST",
          credentials: "include",
        });
        
        if (response.ok) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;