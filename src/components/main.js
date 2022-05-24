import Notes from "./Notes/Notes";
import Video from "./Video/Video";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentCourseContext } from "../context/MainContext";
import { VideoFc } from "./Video/VideoFC";

function Main(props) {
  const { setCurrentCourseValueFromContext } = useContext(CurrentCourseContext);
  const [currencttopic, setCurrent] = useState({});
  let [searchParams, setSearchParams] = useSearchParams(window.location.search); //important topic
  let coursename = searchParams.get("course");
  let topicname = searchParams.get("topics");

  function subtopics(topic) {
    let arr = [];
    Object.keys(topic).map((key) => {
      arr.push({ id: key, value: topic[key] });
    });

    return arr;
  }
  useEffect(() => {
    setCurrentCourseValueFromContext({
      coursename,
      topicname,
    });
  }, [coursename, topicname]);
  //   useEffect(() => {
  //     const coursename = searchParams.get("course");
  //     const topicname = searchParams.get("topics");
  //     filterCourse(coursename, topicname);
  //   },[]);

  function filterCourse(coursename, topicname) {
    props.course.filter((course) => {
      if (coursename === course.value.courseName) {
        subtopics(course.value.topics).map((topic) => {
          if (topic.value.subTopics === topicname) {
            setCurrent({
              courseId: course.id,
              name: course.value.courseName,
              topicid: topic.id,
              topicname: topic.value.subTopics,
              video: topic.value.videoUrl,
            });
            return;
          }
        });
      }
    });
  }

  return (
    <>
      <VideoFc
        course={coursename && coursename}
        topics={topicname && topicname}
        allcourse={props.course && props.course}
      />
      <Notes />
    </>
  );
}

export default Main;
