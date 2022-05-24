import React, { Component, useState } from "react";
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
import { push, ref, update } from "firebase/database";
import {
  CurrentCourseContext,
  FetchContext,
  NotesContext,
} from "../../context/MainContext";
import { database } from "../utility/Firebase";
class Video extends Component {
  static contextType = FetchContext;
  static contextType2 = NotesContext;
  static contextType3 = CurrentCourseContext;
  constructor(props, context) {
    super(props, context);

    this.state = {
      player: "",
      currentTime: "",
      duration: "",
      currenttopic: {},
      user: "",
      fetchContext:FetchContext

    };
  }

  componentDidMount() {
    // subscribe state change

    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  subtopics = (topic) => {
    let arr = [];
    Object.keys(topic).map((key) => {
      arr.push({ id: key, value: topic[key] });
    });

    return arr;
  };

  static filterCourse(coursename, topicname, coursearr) {
    coursearr.filter((course) => {
      if (coursename === course.value.courseName) {
        this.subtopics(course.value.topics).map((topic) => {
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
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state,
      currentTime: state.currentTime,
      duration: state.duration,
      user: this.context.FetchValue,
    });
  }
  componentDidMount() {
    update(ref(database, `users/${this.context.FetchValue.id}`), {
      courseName: "",
    });
  }
  render() {
    console.log(this.state.fetchContext);
    // console.log(this.context.contextType2);
    // console.log(this.context.contextType3);
    // const user = this.context.FetchValue.id;
    // console.log(user);
    // const notesValue = this.context.NotesValueFromContext;
    // if ((this.state.currentTime === this.state.duration) * 100 >= 80) {
    //   push(ref(database, `users/${this.props.coursename}`), {
    //     subTopic: "",
    //     completed: "completed",
    //     notes: 'notesValue',
    //   });
    // }

    return (
      <>
        <div className="player-heading">
          <Player
            ref={(player) => {
              this.player = player;
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
  }
}

export default Video;
