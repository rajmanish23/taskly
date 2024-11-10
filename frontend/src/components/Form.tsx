import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { ACCESS_KEY, REFRESH_KEY } from "../constants";
import api from "../api";

import logoImg from "../assets/taskly-logo-big.png";

type FormProps = React.PropsWithChildren & {
  method: "LOGIN" | "REGISTER";
};

const Form = ({ method }: FormProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ctaLabelText =
    method === "LOGIN" ? "New here?" : "Already have an account?";
  const ctaButtonText =
    method === "LOGIN" ? "Create a new account!" : "Login here!";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (method === "LOGIN") {
        const res = await api.post("/api/token/", { email, password });
        if (res.data.access === undefined && res.data.refresh === undefined) {
          throw Error("API Response does not have access and refresh tokens");
        }
        Cookies.set(ACCESS_KEY, res.data.access, {
          sameSite: "Strict",
          secure: true,
        });
        Cookies.set(REFRESH_KEY, res.data.refresh, {
          sameSite: "Strict",
          secure: true,
        });
        navigate("/");
      } else {
        const res = await api.post("/api/user/register/", {
          email,
          password,
          firstName,
          lastName,
        });
        if (res.status === 201) {
          alert("Account successfully created! Please login to continue");
          navigate("/login");
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img src={logoImg} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {method === "REGISTER" ? (
          <>
            <label htmlFor="re-password">Re-Type password</label>
            <input
              type="password"
              name="re-password"
              id="re-password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        ) : (
          <></>
        )}
        <button type="submit">{isLoading ? "Loading..." : method}</button>
      </form>
      <label htmlFor="cta-button">{ctaLabelText}</label>
      <button id="cta-button">{ctaButtonText}</button>
    </div>
  );
};

export default Form;
