<<<<<<< HEAD
const baseUrl = "http://localhost:3002/api/orders/";
export class OrderServices {
  static async addOrder(data, token, file) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (file) {
      formData.append('photo', file); 
    }

    return fetch(`${baseUrl}addOrder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async deleteOrder(orderId, token) {
    return fetch(`${baseUrl}${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async updateOrder(orderId, data, token, file) {
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    if (file) {
      formData.append('photo', file);
    }

    return fetch(`${baseUrl}update/${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async getAllOrders(token) {
    return fetch(`${baseUrl}all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async repeatOrder(orderId, token) {
    return fetch(`${baseUrl}repeat/${orderId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async updateOrderStatus(orderId, status, token) {
    return fetch(`${baseUrl}${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }), 
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }

  static async getOrdersByStatus(status, token) {
   
    return fetch(`${baseUrl}ordersByStatus`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), 
    })
      .then((response) => response.json())
      .catch((error) => error.message);
  }
}
=======
>>>>>>> 8dc88a190856c9f6d1661a622f3c4be3110be274
