import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export const useAuthorized = () => {
  const [authState, setAuthState] = useState({
    isAuthorized: false,
    role: 'invaliduser',
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/protected", {
          withCredentials: true,
        });
        console.log(res.data); // Handle success
        setAuthState(prev => ({
          ...prev,
          role: res.data.role,
          isAuthorized: true
        }));
      } catch (err) {
        console.error(err); // Handle error
        setAuthState(prev => ({
          role: "invaliduser",
          isAuthorized: false
        })); // Not authorized
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    verifyUser();
  }, []);

  return useMemo(() => (
    {
      authState: authState,
      loading: loading
    }
  ), [authState, loading]);
};
