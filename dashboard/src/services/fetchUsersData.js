import { apiURLs } from "../config/apiURLs.js";


export const fetchUsersData = async () => {
  try {
    const response = await fetch(apiURLs.getAllUsers);
    const data = await response.json();
    if (data && data.users) {
      return data.users.map((item) => ({
        id: item._id,
        name: item.fullName,
        phone: item.phoneNumber,
        location: item.location,
        active: item.active ? "Active" : "Inactive",
        accessLevel:
          item.roleID === 1
            ? "admin"
            : item.roleID === 2
            ? "user"
            : item.roleID === 3
            ? "pharmacy"
            : item.roleID === 4
            ? "warehouse"
            : "driver",
      }));
    } else {
      console.error("Unexpected response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
};
