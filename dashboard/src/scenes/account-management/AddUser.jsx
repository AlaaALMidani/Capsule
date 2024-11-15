import { Box, Button, TextField, Select, MenuItem, Switch, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchAddUserAPI, submitDataToAPI } from "../../services/userServices";
import Header from "../../components/Header";

const roles = [
  { id: "1", label: "Admin" },
  { id: "2", label: "User" },
  { id: "3", label: "Pharmacy" },
  { id: "4", label: "Warehouse" },
  { id: "5", label: "Driver" },
];

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object().shape({
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

const AddUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleUserSubmit = async (values) => {
    try {
      console.log("Submitting User with values:", values);

      const initialData = await fetchAddUserAPI();
      if (!initialData) {
        console.error("No initial data received");
        return;
      }

      const result = await submitDataToAPI(values);
      console.log("User submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting User:", error.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleUserSubmit}
        initialValues={{
          fullName: "",
          phoneNumber: "",
          password: "",
          location: "",
          active: false,
          roleID: "",
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
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
              {/* Dropdown for Role Selection */}
              <Select
                fullWidth
                variant="filled"
                value={values.roleID}
                onChange={(e) => setFieldValue("roleID", e.target.value)}
                displayEmpty
                name="roleID"
                error={!!touched.roleID && !!errors.roleID}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>

              {/* Input Fields */}
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

              {/* Switch for Active Status */}
              <FormControlLabel
                control={
                  <Switch
                    checked={values.active}
                    onChange={(e) => setFieldValue("active", e.target.checked)}
                    name="active"
                    color="secondary"
                  />
                }
                label="Active"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
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

export default AddUser;
