import { TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FetchContext,
  SessionContext,
  UserContext,
} from "../../context/MainContext";
import { auth, database } from "../utility/Firebase";
import "./Login.css";

const Login = () => {
  const [allUsersFetched, setAllUsersFetched] = useState([]);
  const { setFetchValue } = useContext(FetchContext);
  const { currentUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [LoginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = LoginFormValues;
  const handleOnChange = (e) => {
    setLoginFormValues({
      ...LoginFormValues,
      [e.target.name]: e.target.value,
    });
  };

  // sessionStorage.setItem("userData", JSON.stringify(currentUserLoggedIn));
  // const sessionStorageData = JSON.parse(sessionStorage.getItem("userData"));
  // setSessionValue(sessionStorageData);
  const signInUser = async () => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      filterUser();
      navigate("/");
    }
  };
  const getAllUsers = (Userobj) => {
    const allUsersArr = [];
    Object.keys(Userobj).map((key) => {
      const getUsersObj = {
        id: key,
        user: Userobj[key],
      };
      allUsersArr.push(getUsersObj);
    });
    return allUsersArr;
  };
  const filterUser = () => {
    const fetched = allUsersFetched.find((filteredUser) => {
      return filteredUser.user.email === email;
    });
    setFetchValue(fetched);
  };

  useEffect(() => {
    onValue(ref(database, `users`), (snapshot) => {
      const data = snapshot.val();
      const AllFinalUser = getAllUsers(data);
      setAllUsersFetched(AllFinalUser);
    });
  }, []);
  // console.log(allUsersFetched);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await signInUser();
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
