import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import Main from "./components/main";
import Sidemenu from "./components/Sidemenu/Sidemenu";
import { database } from "./components/utility/Firebase";
import {
  CourseContext,
  FetchContext,
  UserContext,
} from "./context/MainContext";

function App() {
  const { setCourseValueFromContext } = useContext(CourseContext);
  const { currentUserLoggedIn } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [assementurl, setAssesmenturl] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const { FetchValue } = useContext(FetchContext);
  console.log(FetchValue);
  useEffect(() => {
    onValue(
      ref(database, `Course/${FetchValue.user.department}`),
      (snapshot) => {
        const data = snapshot.val();
        let arra = [];
        Object.keys(data).map((key) => {
          arra.push({ id: key, value: data[key] });
        });
        setCourses(arra);
      }
    );
  }, []);
  setCourseValueFromContext(courses);
  return (
    <div className="App">
      {/* {console.log(courses)} */}
      <Sidemenu menu={courses && courses} />
      <div
        className="player-notes"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "50px",
        }}
      >
        <Main course={courses && courses} />
      </div>
    </div>
  );
}

export default App;
