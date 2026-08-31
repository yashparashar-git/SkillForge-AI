import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api"

});

export const startInterview = async (data, token) => {

    return API.post(

        "/interview/start",

        data,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

};

export const submitAnswer = async (data, token) => {

    return API.post(

        "/interview/answer",

        data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

};