import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    // console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const {
    login,
    loginWithGoogle,
    loginWithGithub,
    resetPassword,
    loginWithFaceBook,
  } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    // setError('');
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      // if(error.code === "auth/internal-error") {
      //   setError("Invalid email");
      // }
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await loginWithGithub();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await loginWithFaceBook();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if(!user.email) return setError('Please enter your email');

    try {
      await resetPassword(user.email);
      setError('We sent you an email with a link to reset your password');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md 
      rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 
        text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className=" shadow appearance-none border rounded
          w-full py-2 px-3 text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline"
            type="text"
            name="email"
            placeholder="youremail@gmail.com"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 
        text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className=" shadow appearance-none border rounded
          w-full py-2 px-3 text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="******"
            id="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700
        text-white text-sm font-bold py-2 px-4 rounded
        focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          <a
            href="#!"
            className="inline-block align-baseline font-bold
        text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>

      <p className="my-4 text-sm flex-justify-between px-3">
        Don't have an account?
        <Link to="/register">Register</Link>
      </p>

      <button
        onClick={handleGoogleSignIn}
        className="bg-slate-50 hover:bg-slate-200 text-black
          shadow-md rounded border-2 border-gray-300 py-2 px-4
          w-full"
      >
        Login with Google
      </button>

      <button
        onClick={handleGithubSignIn}
        className="bg-slate-50 hover:bg-slate-200 text-black
          shadow-md rounded border-2 border-gray-300 py-2 px-4
          w-full mt-3"
      >
        Login with Github
      </button>

      <button
        onClick={handleFacebookSignIn}
        className="bg-slate-50 hover:bg-slate-200 text-black
          shadow-md rounded border-2 border-gray-300 py-2 px-4
          w-full mt-3"
      >
        Login with Facebook
      </button>
    </div>
  );
}
