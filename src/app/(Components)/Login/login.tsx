"use client";

import React from "react";
import AuthForm from "@/app/ui-components/authForm";

export default function LoginPage() {
  const handleLogin = (formData: { email: string; password: string }) => {
    console.log("Login Data:", formData);
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
