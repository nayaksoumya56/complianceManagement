import { set, push, ref, remove, onValue, update } from "firebase/database";
import { database } from "../components/utility/Firebase";

class FirebaseService {
  getAllCourses() {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  }

  getCourses(urllink) {
    onValue(ref(database, urllink), (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  }

  createCourse(course, urllink) {
    push(ref(database, `/Course/${urllink}`), course);
  }

  createTopic = (courseinfo, urllink, courseUID, topic) => {
    return push(
      ref(database, `/Course/${urllink}/${courseUID}/topics`),
      courseinfo
    );
  };

  handleDelete = (urllink, courseUID) => {
    return remove(ref(database, `/Course/${urllink}/${courseUID}`));
  };

  handleUpdate = (courseinfo, urllink, courseUID) => {
    return update(ref(database, `/Course/${urllink}/${courseUID}`), courseinfo);
  };
}
export default new FirebaseService();
