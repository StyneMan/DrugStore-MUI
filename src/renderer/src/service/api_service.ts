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

  //   static post = (url, body, config = {}) => axiosInstance.post(url, body, config).then((res) => res);

  //   static update = (url, id, body) => axiosInstance.patch(`${url}/${id}`, body).then((res) => res);

  //   static delete = (url, id) => axiosInstance.delete(`${url}/${id}`).then((res) => res);
}

export default APIService;
