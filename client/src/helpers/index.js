import { Auth_Token } from "../constants";
//TODO encrypt data
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

/////

export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
