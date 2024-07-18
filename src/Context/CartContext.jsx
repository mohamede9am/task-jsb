import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext(0);

export default function CartContextProvider({ children }) {
  function sendDataToApi(values) {
    const method = values.method || 'POST';
    delete values.method;

    const url = method === 'DELETE' ? `https://dummyapi.io/data/v1/user/${values.id}` : 'https://dummyapi.io/data/v1/user/create';
    return axios({
      method,
      url,
      headers: {
        "app-id": "64fc4a747b1786417e354f31",
      },
      data: values,
    }).then((response) => response);
  }

  function getDataFromApi({ page, limit }) {
    return axios
      .get(`https://dummyapi.io/data/v1/user?page=${page}&limit=${limit}`, {
        headers: {
          "app-id": "64fc4a747b1786417e354f31",
        },
      })
      .then((response) => response);
  }

  function editContact(id, values) {
    return axios
      .put(`https://dummyapi.io/data/v1/user/${id}`, values, {
        headers: {
          "app-id": "64fc4a747b1786417e354f31",
        },
      })
      .then((response) => response);
  }

  function deleteContact(id) {
    return axios.delete(`https://dummyapi.io/data/v1/user/${id}`, {
      headers: {
        "app-id": "64fc4a747b1786417e354f31",
      },
    }).then(response => response);
  }
  

  return (
    <CartContext.Provider value={{ sendDataToApi, getDataFromApi, editContact, deleteContact }}>
      {children}
    </CartContext.Provider>
  );
}
