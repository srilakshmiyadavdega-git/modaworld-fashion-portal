import axios from "axios";
import dbData from "../../data/db.json";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000
});

// Helper functions for offline/demo fallback using localStorage
const getLocalUsers = () => {
  try {
    const stored = localStorage.getItem("modaworld_users");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Could not read local users:", e);
  }
  return dbData.users || [];
};

const getLocalOrders = () => {
  try {
    const stored = localStorage.getItem("modaworld_orders");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Could not read local orders:", e);
  }
  return dbData.orders || [];
};

export const getProducts = async () => {
  try {
    const res = await API.get("/products");
    return res;
  } catch (error) {
    console.warn("Live API unavailable, using fallback products data.");
    return { data: dbData.products || [] };
  }
};

export const getProduct = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    return res;
  } catch (error) {
    console.warn(`Live API unavailable, using fallback for product ${id}.`);
    const found = (dbData.products || []).find((item) => String(item.id) === String(id));
    if (found) {
      return { data: found };
    }
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const res = await API.get("/users");
    return res;
  } catch (error) {
    return { data: getLocalUsers() };
  }
};

export const registerUser = async (user) => {
  try {
    const res = await API.post("/users", user);
    return res;
  } catch (error) {
    const users = getLocalUsers();
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    try {
      localStorage.setItem("modaworld_users", JSON.stringify(users));
    } catch (e) {
      console.warn("Could not persist user to localStorage:", e);
    }
    return { data: newUser };
  }
};

export const createOrder = async (order) => {
  try {
    const res = await API.post("/orders", order);
    return res;
  } catch (error) {
    const orders = getLocalOrders();
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    try {
      localStorage.setItem("modaworld_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Could not persist order to localStorage:", e);
    }
    return { data: newOrder };
  }
};

export const getOrders = async () => {
  try {
    const res = await API.get("/orders");
    return res;
  } catch (error) {
    return { data: getLocalOrders() };
  }
};  
