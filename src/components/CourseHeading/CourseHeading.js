import React from "react";
import "./CourseHeading.css";

const CourseHeading = () => {
  return (
    <>
      <div className="headings">
        <div className="course-name">
          <h1>
            CourseName <span>(Topic)</span>
          </h1>
        </div>
        <div className="instructor-name">
          <h1>InstructorName</h1>
        </div>
      </div>
      <div className="description">
      <h1>
            Course<span>Description</span>
          </h1>
      </div>
    </>
  );
};

export default CourseHeading;
