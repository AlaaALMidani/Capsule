import { token } from "./userServices";

const baseUrl = "http://localhost:3002/api/offers/";

export class OfferServices {

  static async addOffer(offerData, token) {
    return fetch(`${baseUrl}addOffer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async deleteOffer(id, token) {
    return fetch(`${baseUrl}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async updateOffer(id, offerData, token) {
    return fetch(`${baseUrl}${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async getMyOffers(token) {
    return fetch(`${baseUrl}myOffers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async getOffersByOrder(orderID, token) {
    return fetch(`${baseUrl}order/${orderID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async getOfferById(id, token) {
    return fetch(`${baseUrl}${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => ({ success: false, error: error.message }));
  }

  static async getMyOrdersWithOffers() {
    return fetch(`${baseUrl}/orderOffers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      }).then((data) => data)
      .catch((error) => ({ success: false, error: error.message }));
  }

}