import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getSingleProduct = async (pId) => {
  try {
    let res = await axios.get(`${apiURL}/api/products/${pId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/products/${formData.pId}/reviews`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  try {
    let res = await axios.delete(`${apiURL}/api/products/${formData.pId}/reviews/${formData.rId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
