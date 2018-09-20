import Axios from 'axios';

export const BACKEND_URL =  'http://localhost:3000';
export const FIREBASE_URL = 'https://my-vue-project-9b5f5.firebaseio.com';

export default {

    // posts

    GetPosts() {
        return Axios.get(BACKEND_URL + "/blogposts")
            .then(result => {
                return result.data;
            });
    },
    GetPost(postID) {
        return Axios.get(BACKEND_URL + "/blogposts/" + postID)
            .then(result => {
                return result.data;
            });
    },

    // contact
    PostContactMessage(data) {
        return Axios.post(FIREBASE_URL + '/contactMessages.json', data)
            .then(() => {
                return true;
            }).catch(error => {
                console.warn(error);
                return false;
            });
    },

    // survey
    GetSurveyResponses() {
        return Axios.get(FIREBASE_URL + "/surveyResponses.json")
            .then(result => {
                return result.data;
            });
    },

    PostSurveyResponse(data) {
        return Axios.post(FIREBASE_URL + '/surveyResponses.json', data)
            .then(() => {
                return true;
            }).catch(error => {
                console.warn(error);
                return false;
            });
    },
}