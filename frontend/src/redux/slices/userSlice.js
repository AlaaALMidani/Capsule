import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: null, // 'patient', 'pharmacy', 'supplier', 'delivery'
  userPages: [],  // الصفحات المتاحة حسب نوع المستخدم
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
      switch (action.payload) {
        case 'patient':
          state.userPages = ['Home', 'offers', 'history', 'Profile'];
          break;
        case 'pharmacy':
          state.userPages = ['Home', 'Manage Orders', 'Offers', 'history', 'Profile'];
          break;
        case 'supplier':
          state.userPages = ['Home', 'history', 'Orders', 'Profile'];
          break;
        case 'delivery':
          state.userPages = ['Home', 'Delivery Tasks', 'Notifications', 'Profile'];
          break;
        default:
          state.userPages = [];
      }
    },
  },
});

export const { setUserType } = userSlice.actions;
export default userSlice.reducer;
