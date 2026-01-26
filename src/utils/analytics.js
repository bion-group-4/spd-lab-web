import { analytics } from "../config/firebase";
import { logEvent } from "firebase/analytics";

/**
 * Log a standard Firebase Analytics event.
 * @param {string} eventName - The name of the event.
 * @param {object} eventParams - The parameters for the event.
 */
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
    // Remove console log in production
    if (import.meta.env.DEV) {
      console.log(`[Firebase Analytics] ${eventName}`, eventParams);
    }
  }
};

// --- E-commerce Events ---

export const logViewItem = (product) => {
  logAnalyticsEvent("view_item", {
    currency: "IDR",
    value: product.pPrice,
    items: [
      {
        item_id: product._id,
        item_name: product.pName,
        price: product.pPrice,
        item_category: product.pCategory?.cName, // Assuming populated
        quantity: 1,
      },
    ],
  });
};

export const logAddToCart = (product, quantity) => {
  logAnalyticsEvent("add_to_cart", {
    currency: "IDR",
    value: product.pPrice * quantity,
    items: [
      {
        item_id: product._id,
        item_name: product.pName,
        price: product.pPrice,
        item_category: product.pCategory?.cName,
         quantity: quantity,
      },
    ],
  });
};

export const logRemoveFromCart = (product) => {
  logAnalyticsEvent("remove_from_cart", {
    currency: "IDR",
    value: product.pPrice,
    items: [
      {
        item_id: product._id,
        item_name: product.pName,
        price: product.pPrice,
        quantity: 1, // Usually removing one item or line item
      },
    ],
  });
};

export const logBeginCheckout = (cartItems, totalAmount) => {
  logAnalyticsEvent("begin_checkout", {
    currency: "IDR",
    value: totalAmount,
    items: cartItems.map((item) => ({
      item_id: item.id, // Note: structure depends on how cart is stored
      // need to ensure we have name/price in cart if possible or fetch it
      // For now, assuming basic info is available or just ID
    })),
  });
};

export const logPurchase = (transactionId, amount, cartItems) => {
  logAnalyticsEvent("purchase", {
    transaction_id: transactionId,
    value: amount,
    currency: "IDR",
    items: cartItems.map((item) => ({
      item_id: item.id || item._id, // Handle different objects if needed
      price: item.price || item.pPrice,
      quantity: item.quantitiy || item.quantity || 1, // Check spelling 'quantitiy' from existing code
    })),
  });
};

// --- User Events ---
export const logLogin = (method = "email") => {
  logAnalyticsEvent("login", {
    method: method,
  });
};

export const logSignUp = (method = "email") => {
  logAnalyticsEvent("sign_up", {
    method: method,
  });
};
