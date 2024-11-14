import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios"; 
import Header from "../../components/dashboard/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('https://ffc0-5-0-138-84.ngrok-free.app/api/admin/addUser');
      console.log('API response:', response);
      console.log('Fetched data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  const submitDataToAPI = async (values) => {
    try {
      const response = await axios.post('https://ffc0-5-0-138-84.ngrok-free.app/api/admin/addUser', values);
      console.log('Submitted data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting data:', error);
      throw error;
    }
  };

  const handleFormSubmit = async (values) => {
    console.log('Submitting form with values:', values);
    try {
      const initialData = await fetchDataFromAPI();
  
      if (!initialData) {
        console.error('No initial data received');
        return;
      }
  
      const initialValues = {
        fullName: initialData.fullName || '',
        phoneNumber: initialData.phoneNumber || '',
        password: initialData.password || '',
        location: initialData.location || '',
        active: initialData.active || false,
        roleID: initialData.roleID || '',
      };
  
      const result = await submitDataToAPI(values);
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };


  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          fullName: "",
          phoneNumber: "",
          password: "",
          location: "",
          active: false,
          roleID: "",
        }}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="checkbox"
                label="Active"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values.active}
                name="active"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Role ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleID}
                name="roleID"
                error={!!touched.roleID && !!errors.roleID}
                helperText={touched.roleID && errors.roleID}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  location: yup.string().required("Location is required"),
  active: yup.boolean(),
  roleID: yup.string().required("Role ID is required"),
});

export default Form;
