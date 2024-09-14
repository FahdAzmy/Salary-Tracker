import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtecteRoute({ element }) {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Navigate to="/login" replace /> : element;
}
