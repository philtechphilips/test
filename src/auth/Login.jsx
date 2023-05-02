import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Spinner from "./Spinner";

const Login = () => {

  const { login, errors, isSubmitting } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2 lg:w-1/3"
      >
        <div className="text-center text-xl font-bold mb-5">
          <p>Task Manager</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
           {errors && (
            <p className="text-red-600">{errors}</p>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p
            className="absolute top-9 right-3 h-full w-10 text-gray-600 text-sm font-semibold focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isSubmitting ? <Spinner /> : "Login"}
          </button>
        </div>

        <div className="w-full pt-3">
          <p className="text-center">
            Dont have an account?{" "}
            <span className="text-blue-800 hover:text-blue-900 font-semibold">
              <Link to="/create-account">Create Account</Link>
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
