import axiosInstance from "../utils/axios";

class APIService {
  static fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);

  static clockIn = (payload: unknown) =>
    axiosInstance.post("/oauth/token", payload).then((res) => res.data);

  static getProducts = () =>
    axiosInstance.get("/connector/api/product").then((res) => res.data);

  static getCategories = () =>
    axiosInstance.get("/connector/api/taxonomy").then((res) => res.data);

  static getProductsStockReport = () =>
    axiosInstance
      .get("/connector/api/product-stock-report")
      .then((res) => res.data);

  static getPaymentMethods = () =>
    axiosInstance.get("/connector/api/payment-methods").then((res) => res.data);

  static getBusinessLocations = () =>
    axiosInstance
      .get("/connector/api/business-location")
      .then((res) => res.data);

  static createCashRegister = (payload: unknown) =>
    axiosInstance
      .post("/connector/api/cash-register", payload)
      .then((res) => res.data);

  static addNewCustomer = (payload: unknown) =>
    axiosInstance
      .post("/connector/api/contactapi", payload)
      .then((res) => res.data);

  static getCustomers = () =>
    axiosInstance.get("/connector/api/contactapi").then((res) => res.data);

  static getUsers = () =>
    axiosInstance.get("/connector/api/user").then((res) => res.data);

  static createSell = (payload: unknown) =>
    axiosInstance.post("/connector/api/sell", payload).then((res) => res.data);

  static getSalesReport = (locationId: number, userId: number) =>
    axiosInstance.get(`/connector/api/sell?location_id=${locationId}?user_id=${userId}?per_page=${-1}`).then((res) => res.data);
}

export default APIService;
