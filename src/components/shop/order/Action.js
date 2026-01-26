import { createOrder } from "./FetchApi";
import { logPurchase } from "../../../utils/analytics";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};



export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history,
  enqueueSnackbar
) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
    enqueueSnackbar("Please provide your address", { variant: "error" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
    enqueueSnackbar("Please provide your phone number", { variant: "error" });
  } else {
    dispatch({ type: "loading", payload: true });

    // Convert to number strictly
    const amount = Number(totalCost());
    const paymentData = {
      orderId: 'ORDER-' + new Date().getTime(), // Generate simple Order ID
      amount: amount,
      user_details: {
          first_name: JSON.parse(localStorage.getItem("jwt")).user.name,
          email: JSON.parse(localStorage.getItem("jwt")).user.email,
          phone: state.phone,
          address: state.address
      }
    };

    try {
      // 1. Get Snap Token
      const res = await getPaymentProcess(paymentData);

      if (res && res.clientSecret) {
        dispatch({ type: "loading", payload: false });

        // 2. Open Snap Popup
        window.snap.pay(res.clientSecret, {
          onSuccess: async function(result){
            console.log('payment success!', result);
            enqueueSnackbar("Payment Success!", { variant: "success" });

            // Analytics: Purchase
            // Need to reconstruct cart items or pass them.
            // The cart is in localStorage "cart".
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            logPurchase(result.transaction_id || paymentData.orderId, amount, cartItems);

            // 3. Create Order
            let orderData = {
                allProduct: JSON.parse(localStorage.getItem("cart")),
                user: JSON.parse(localStorage.getItem("jwt")).user._id,
                amount: amount,
                transactionId: result.transaction_id || paymentData.orderId,
                address: state.address,
                phone: state.phone,
                snap_token: res.clientSecret, // Store for reference
            };

            try {
                let responseData = await createOrder(orderData);
                if (responseData.success) {
                    localStorage.setItem("cart", JSON.stringify([]));
                    dispatch({ type: "cartProduct", payload: null });
                    dispatch({ type: "cartTotalCost", payload: null });
                    dispatch({ type: "orderSuccess", payload: true });
                    setState({ clientToken: "", instance: {} });
                    return history.push("/");
                } else if (responseData.error) {
                    console.log(responseData.error);
                    enqueueSnackbar(responseData.error, { variant: "error" });
                }
            } catch (error) {
                console.log(error);
            }
          },
          onPending: function(result){
            console.log('wating your payment!', result);
            setState({ ...state, error: "Payment Pending. Please complete payment." });
            enqueueSnackbar("Payment Pending", { variant: "info" });
          },
          onError: function(result){
            console.log('payment failed!', result);
             setState({ ...state, error: "Payment Failed." });
             enqueueSnackbar("Payment Failed", { variant: "error" });
          },
          onClose: function(){
            console.log('customer closed the popup without finishing the payment');
             setState({ ...state, error: "Payment Closed." });
             enqueueSnackbar("Payment Closed", { variant: "warning" });
          }
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "loading", payload: false });
      setState({ ...state, error: err.message });
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }
};
