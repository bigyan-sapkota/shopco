import React from "react";
import { useProfile } from "../queries/use-profile";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { data } = useProfile();
  const navigate = useNavigate();

  if (data) {
    navigate("/");
  }

  return <div>LoginPage</div>;
}
