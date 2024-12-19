import { useState } from "react";

export const useLoginButtonState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = () => setIsLoggedIn(true);
  const loggedOut = () => setIsLoggedIn(false);

  return { isLoggedIn, loggedIn, loggedOut };
};
