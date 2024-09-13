import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiration time in seconds
}

export const isJwtExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
