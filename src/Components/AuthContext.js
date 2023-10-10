import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) return;
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
