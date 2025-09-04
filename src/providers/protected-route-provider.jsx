import React from "react";
import { useProfile } from "../queries/use-profile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children }) {
  const { data } = useProfile();
  const navigate = useNavigate();

  if (!data) {
    navigate("/login");
    toast.error("You are not logged in to access this page.");
  }

  return <>{children}</>;
}
