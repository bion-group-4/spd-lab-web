import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const cartListProduct = async () => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let items = [];
  if (carts) {
    for (const cart of carts) {
      items.push({ productId: cart.id, quantity: cart.quantity || 1 });
    }
  }
  if (items.length === 0) return { Products: [] };
  try {
    let res = await axios.post(`${apiURL}/api/products/cart`, {
      items,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
