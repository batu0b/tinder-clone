import { Auth_Token, CryptLen } from "../constants";
export const setAuthToken = (token) => {
  const encrypted = token;
  localStorage.setItem(Auth_Token, encrypted);
};

export const getAuthToken = () => {
  const token = localStorage.getItem(Auth_Token);
  if (token && token !== null) {
    const decodedToken = token;
    return decodedToken;
  }
};

export const removeAuhtToken = () => {
  localStorage.removeItem(Auth_Token);
};
