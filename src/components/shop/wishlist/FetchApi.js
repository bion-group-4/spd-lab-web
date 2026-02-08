import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const wishListProducts = async () => {
  let wishList = JSON.parse(localStorage.getItem("wishList"));
  let items = [];
  if (wishList) {
    for (const id of wishList) {
      items.push({ productId: id });
    }
  }
  try {
    let res = await axios.post(`${apiURL}/api/products/wish`, {
      items,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
