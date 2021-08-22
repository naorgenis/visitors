import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

let logoutTimer;

export const useAuth = () => {
  const history = useHistory();
  const [token, setToken] = useState(null);
  const [tokenExperationDate, setTokenExperationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token, experation) => {
    setToken(token);
    setUserId(userId);

    const experationToken =
      experation || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExperationDate(experationToken);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        experation: experationToken.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setToken(null);
    setUserId(null);
    setTokenExperationDate(null);
    history.push("/");
  }, [history]);

  useEffect(() => {
    if (token && tokenExperationDate) {
      const remainingTime =
        tokenExperationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExperationDate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.experation) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.experation));
    }
  }, [login]);

  return { token, userId, login, logout };
};
