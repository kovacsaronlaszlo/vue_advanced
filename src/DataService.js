import Axios from "axios";

export const FIREBASE_URL = "https://my-vue-project-9b5f5.firebaseio.com";

export default {
  GetPost(postID) {
    return Axios.get(`${FIREBASE_URL}/blogposts/${postID}.json`).then(
      result => {
        return result.data;
      }
    );
  },

  // contact message

  PostContactMessage(data) {
    return Axios.post(FIREBASE_URL + "/contactMessages.json", data)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.warn(error);
        return false;
      });
  },

  // survey

  GetSurveyData() {
    return Axios.get(FIREBASE_URL + "/surveyResponses.json").then(result => {
      return result.data;
    });
  },

  PostSurveyResponse(data) {
    return Axios.post(FIREBASE_URL + "/surveyResponses.json", data)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.warn(error);
        return false;
      });
  }
};
