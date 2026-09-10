import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getProducts = () => {
  return API.get("/products");
};

export const getProduct = (id) => {
  return API.get(`/products/${id}`);
};

export const getUsers = () => {
  return API.get("/users");
};

export const registerUser = (user) => {
  return API.post("/users", user);
};

export const createOrder = (order) => {
  return API.post("/orders", order);
};

export const getOrders = () => {
  return API.get("/orders");
}  
