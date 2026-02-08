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

export const getAllOrder = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/orders`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (oId, status) => {
  let data = { status: status };
  console.log(data);
  try {
    let res = await axios.put(`${apiURL}/api/orders/${oId}`, data, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (oId) => {
  try {
    let res = await axios.delete(`${apiURL}/api/orders/${oId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
