import { onValue, ref, serverTimestamp } from "firebase/database";
import { useEffect, useState } from "react";
import UploadFormData from "../../const/UploadFormData";
import {
  Card,
  TextField,
  TextareaAutosize,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import "./Upload.css";
import { database, storage } from "../utility/Firebase";

import {
  ref as myref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseService from "../../services/firebaseService";
import LinearProgressWithLabel from "./progress";
const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [course, setSelectedCourse] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [selectValue, setSelectValue] = useState("");
  const [firebasedata, setFirebasedata] = useState([]);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        let getcourses = Object.keys(data.Course).map(
          (key) => data.Course[key]
        );
        if (getcourses) {
          let arr = getcourses.reduce(function (r, o) {
            Object.keys(o).forEach(function (k) {
              let obj = { course: o[k].courseName, id: k };
              r.push(obj);
            });
            return r;
          }, []);
          setFirebasedata(arr);
        }
      }
    });
  }, []);

  const allcourses = ["React", "Html", "Css", "Angular"];

  const onCourseChange = (event, value) => {
    setSelectedCourse(value);
    if (firebasedata) {
      let obj = firebasedata.find((o) => o.course === value);
      setCourseId(obj.id);
    }
  };

  const handleSelectValue = (e) => {
    setSelectValue(e.target.value);
  };

  const handleFileValue = (e) => {
    setFileValue(e.target.files[0]);
  };
  const handleInputValue = (e, inputConfig) => {
 
        setInputValue({
      ...inputValue,
      [inputConfig.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadFiles(fileValue);
    } catch (err) {
      alert(err);
    }
  };

  //course
  const createcourse = async (obj, urllink) => {
    try {
      firebaseService.createCourse(obj, urllink);
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };
  //update
  const createTopic = async (obj, urllink, courseid, topic) => {
    try {
      firebaseService.createTopic(obj, urllink, courseid, topic);
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = myref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        return error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (courseId !== null) {
            const obj = {
              subTopics: inputValue.topicname,
              videoUrl: downloadURL,
              createdAt:serverTimestamp()
            };

            const url = `/${selectValue}`;

            createTopic(obj, url, courseId, inputValue.topicname);
          } else {
            const obj = {
              courseName: course,
              assesmentLink: inputValue.assesmenturl,
              courseDescription: inputValue.description,
              //topics: inputValue.topicname,
              instructorName: inputValue.instructorname,
              //videoUrl: downloadURL,
            };

            const url = `/${selectValue}`;
            console.log(obj, url);
            createcourse(obj, url);
          }
        });
      }
    );
  };

  return (
    <>
      {console.log(courseId)}
      <Card className="form-card">
        {progress > 0 ? <LinearProgressWithLabel value={progress} /> : ""}
        <form>
          {UploadFormData.map((inputCreation, key) => {
            switch (inputCreation.type) {
              case "text":
                return (
                  <div className="input-style" key={key}>
                    <label>{inputCreation.label}</label>
                    <TextField
                      key={key}
                      {...inputCreation}
                      onChange={(e) => handleInputValue(e, inputCreation)}
                    />
                  </div>
                );
              case "file":
                return (
                  <div className="input-style" key={key}>
                    <label>{inputCreation.label}</label>
                    <label
                      style={{
                        border: "1px solid",
                        padding: "10px 30px",
                        cursor: "pointer",
                      }}
                      htmlFor="file-upload"
                    >
                      {inputCreation.label}
                    </label>
                    <input
                      type="file"
                      hidden
                      id="file-upload"
                      onChange={handleFileValue}
                    />
                  </div>
                );
              case "textarea":
                return (
                  <div className="input-style" key={key}>
                    <label>{inputCreation.label}</label>
                    <TextareaAutosize
                      placeholder={inputCreation.placeholder}
                      onChange={(e) => handleInputValue(e, inputCreation)}
                    />
                  </div>
                );
              case "select":
                return (
                  <div className="input-style" key={key}>
                    <label>{inputCreation.label}</label>
                    <TextField
                      select
                      value={selectValue}
                      onChange={handleSelectValue}
                      label="Select Departments"
                    >
                      {inputCreation.departments.map((department, key) => {
                        return (
                          <MenuItem key={key} value={department}>
                            {department}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>
                );
              case "autocomplete":
                return (
                  <div className="input-style" key={key}>
                    <label>{inputCreation.label}</label>
                    <Autocomplete
                      className="courses"
                      id="free-solo-demo"
                      freeSolo
                      options={allcourses}
                      sx={{ width: 300 }}
                      onChange={onCourseChange}
                      inputValue={course}
                      renderInput={(params) => (
                        <TextField {...params} value={course} />
                      )}
                    />
                  </div>
                );
              default:
                break;
            }
          })}
          <div style={{ textAlign: "center" }}>
            <button onClick={handleSubmit}>Submit </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Upload;
