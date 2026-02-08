import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getUserById = async (uId) => {
  try {
    let res = await axios.get(`${apiURL}/api/users/${uId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.put(`${apiURL}/api/users/${userData.uId}`, userData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.get(`${apiURL}/api/order/users/${uId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.put(`${apiURL}/api/users/${formData.uId}/password`, formData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
