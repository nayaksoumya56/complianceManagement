import React, { useEffect, useState, useContext, useRef } from "react";
import { push, ref, update } from "firebase/database";
import { database } from "../utility/Firebase";
import {
  CourseContext,
  CurrentCourseContext,
  FetchContext,
  NotesContext,
} from "../../context/MainContext";
import "../../../node_modules/video-react/dist/video-react.css";
import "./Video.css";
import {
  Player,
  LoadProgressBar,
  ControlBar,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  ForwardControl,
  ReplayControl,
} from "video-react";
import CourseHeading from "../CourseHeading/CourseHeading";

export const VideoFc = (props) => {
  const { NotesValueFromContext } = useContext(NotesContext);
  const { FetchValue } = useContext(FetchContext);
  const { CurrentCourseValueFromContext } = useContext(CurrentCourseContext);
  console.log(CurrentCourseValueFromContext);
  const playerRef = useRef();
  const [state, setState] = useState({
    player: "",
    currentTime: "",
    duration: "",
    currenttopic: {},
  });
  const subtopics = (topic) => {
    let arr = [];
    Object.keys(topic).map((key) => {
      arr.push({ id: key, value: topic[key] });
    });

    return arr;
  };
  const filterCourse = (coursename, topicname, coursearr) => {
    coursearr.filter((course) => {
      if (coursename === course.value.courseName) {
        subtopics(course.value.topics).map((topic) => {
          if (topic.value.subTopics === topicname) {
            return {
              courseId: course.id,
              name: course.value.courseName,
              topicid: topic.id,
              topicname: topic.value.subTopics,
              video: topic.value.videoUrl,
            };
          }
        });
      }
    });
  };

  const handleStateChange = (state, prevState) => {
    // copy player state to this component's state
    setState((prev) => ({
      ...prev,
      player: state,
      currentTime: state.currentTime,
      duration: state.duration,
    }));
  };

  // componentDidMount
  useEffect(() => {
    console.log(CurrentCourseValueFromContext);
    if (CurrentCourseValueFromContext) {
      update(
        ref(
          database,
          `users/${FetchValue.id}/${CurrentCourseValueFromContext.coursename}/${CurrentCourseValueFromContext.topicname}`
        ),
        {
          topicName: CurrentCourseValueFromContext.topicname,
        }
      );
    }
    if (playerRef && playerRef.current) {
      playerRef.current.subscribeToStateChange = handleStateChange;
    }
  }, [CurrentCourseValueFromContext]);

  return (
    <>
      <div className="player-heading">
        <Player
          ref={(player) => {
            playerRef.current = player;
          }}
        >
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          <ControlBar>
            <VolumeMenuButton vertical />
            <ForwardControl seconds={5} order={3.1} />
            <ReplayControl seconds={5} order={2.1} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
            <LoadProgressBar />
          </ControlBar>
        </Player>
        <CourseHeading />
      </div>
    </>
  );
};
