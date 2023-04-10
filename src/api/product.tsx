import { IProduct } from "../interfaces/Product";
import instance from "./instance";

const getToken = () => {
    const { accessToken } = JSON.parse(localStorage.getItem("user")!);
    return accessToken;
};
export const getProducts = () => {
    return instance.get(`/products`);
};

export const getProduct = (id: number | string) => {
    return instance.get(`/products/${id}`);
};

export const removeProduct = (id: number | string) => {
    const accessToken = getToken();
    if (accessToken) {
        return instance.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
};

export const createProduct = (product: IProduct) => {
    const accessToken = getToken();
    if (accessToken) {
        return instance.post("/products", product, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
};

export const updateProduct = (product: IProduct) => {
    const accessToken = getToken();
    if (accessToken) {
        return instance.put(`/products/${product._id}`, product, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
};