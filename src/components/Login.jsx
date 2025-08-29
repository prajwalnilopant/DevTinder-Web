import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    // API call
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="card card-border bg-base-300 w-96 card-lg justify-center mx-auto my-10">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <fieldset className="fieldset">
            {!isLoginForm && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name" />
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="Last Name" />
              </>
            )}
            <legend className="fieldset-legend">Email</legend>
            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input" placeholder="Enter your email" />
            <legend className="fieldset-legend">Password</legend>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Enter your Password" />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
              {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
