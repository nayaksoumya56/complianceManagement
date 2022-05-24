import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import "./Sidemenu.css";
import CourseHeading from "../CourseHeading/CourseHeading";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utility/Firebase";

function subtopics(topic) {
  let arr = [];
  Object.keys(topic).map((key) => {
    arr.push({ id: key, value: topic[key] });
  });

  return arr;
}
const Sidemenu = (props) => {
  const navigate = useNavigate();
  const uploadNavigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const logOutHandle = async () => {
    await signOut(auth);
    sessionStorage.clear();
    console.log("signnedOut");
    await navigate("/login");
  };
  return (
    <>
      <IconButton
        onClick={() => setDrawerOpen(true)}
        style={{
          position: "absolute",
          top: "20px",
          left: "45px",
          border: "1px solid",
          borderRadius: 0,
          width: "55px",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className="side-menu"
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box>
          <h1>Courses</h1>
        </Box>
        <Box>
          {props.menu.map((course) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h6>{course.value.courseName}</h6>
              </AccordionSummary>
              <AccordionDetails>
                {subtopics(course.value.topics).map((sub) => (
                  <p>
                    <Link
                      to={`?course=${course.value.courseName}&topics=${sub.value.subTopics}`}
                    >
                      {sub.value.subTopics}
                    </Link>
                  </p>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>
      <button onClick={logOutHandle}>LogOut</button>
      <button onClick={() => uploadNavigate("/upload")}>Upload</button>
    </>
  );
};

export default Sidemenu;
