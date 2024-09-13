import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtecteRoute({ element }) {
  const { isLoggedIn, checkingAuth } = useContext(AuthContext);
  if (checkingAuth) {
    return <div></div>; // يمكن تخصيص هذه الرسالة
  }
  return !isLoggedIn ? <Navigate to="/login" /> : element;
}
