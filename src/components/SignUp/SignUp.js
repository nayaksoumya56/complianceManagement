import { TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "./SignUp.css";
import { auth } from "../utility/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../utility/Firebase";
import { set, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [signUpFormValues, setSignUpFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    department: "",
  });
  const { username, email, password, confirmpassword, department } =
    signUpFormValues;
  const handleOnChange = (e) => {
    setSignUpFormValues({
      ...signUpFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const createUser = async () => {
    await push(ref(database, `users`), {
      username,
      email,
      department,
    });
    await setSignUpFormValues(signUpFormValues);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(user);
      createUser();
      await navigate("/login");
    } else {
      alert("Password and Confirm Password not Matched ");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUpSubmit}>
        <div className="input-style">
          <label>UserName</label>
          <TextField
            placeholder="UserName"
            name="username"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-style">
          <label>Email</label>
          <TextField
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-style">
          <label>Password</label>
          <TextField
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-style">
          <label>Confirm Password</label>
          <TextField
            type="password"
            placeholder="Password"
            name="confirmpassword"
            onChange={handleOnChange}
          />
        </div>
        <div className="input-style">
          <label>Department</label>
          <TextField
            select
            value={signUpFormValues.department}
            onChange={handleOnChange}
            label="Select Departments"
            name="department"
          >
            <MenuItem value="QA">QA</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
          </TextField>
        </div>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
