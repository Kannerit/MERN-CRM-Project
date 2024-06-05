import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get("/profile");
      setUser(data);
      setLoading(false)
      console.log("Profile data:", data);
    } catch (error) {
      setLoading(false)
      console.error("Error:", error);
    }
  };


  const logout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
    } catch (error) {
      console.error("Error while logging out:", error)
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, fetchUserProfile, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
