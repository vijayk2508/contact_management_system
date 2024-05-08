import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { ContactContext } from "../../../Context/ContactContext";
import { handleModalClose } from "../../../Utils/helper";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core";
import { phonePrefixOptions } from "../../../Constant/country";
import { createContact, editContact } from "../../../Services/contactServices";
import { isObjectDirty } from "../../../Utils/general";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1.5),
  },
  error: {
    marginLeft: 0,
  },
}));

const initialFormData = {
  name: "",
  email: "",
  phone_number: "",
  phone_number_prefix: "+91",
  about: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z0-9\s]*$/, "Name should contain only alphabets"),
  email: Yup.string()
    .email("Please enter the correct email format.")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .required("Address is required")
    .max(100, "Address must be less than or equal to 20 characters"),
  about: Yup.string()
    .required("About is required")
    .max(370, "About must be less than or equal to 370 characters"),
});

function CreateEditContact() {
  const { state, dispatch } = useContext(ContactContext);
  const modal = state?.modal || null;

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (modal?.data) {
      setFormData({
        ...modal?.data,
        about: modal?.data?.description || "",
      });
    }

    return () => {
      setFormData(initialFormData);
    };
  }, [modal]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    try {
      // Assuming validationSchema is defined elsewhere
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const { about, ...restFormData } = formData;
      const objContact = { ...restFormData, description: about };

      let res = false;

      if (!modal?.data?._id) {
        res = await createContact(objContact, dispatch);
      } else {
        const updateContactData = isObjectDirty(objContact, modal?.data);

        if (updateContactData) {
          res = await editContact(modal?.data._id, updateContactData, dispatch);
        }
      }

      if (res) {
        handleModalClose(dispatch);
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  const disableSubmitButton = useMemo(() => {
    if (!modal?.data?._id) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone_number ||
        !formData.about ||
        !formData.address
      ) {
        return true;
      }
    } else {
      const { about, ...restFormData } = formData;
      const objContact = { ...restFormData, description: about };
      const updateContactData = isObjectDirty(objContact, modal?.data);

      if (!updateContactData) return true;
      else return false;
    }

    return false;
  }, [formData, modal?.data]);

  return (
    <React.Fragment>
      <DialogContent>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={Boolean(errors.name)}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormHelperText className={classes.error}>
            {errors.name}
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={Boolean(errors.email)}
        >
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormHelperText className={classes.error}>
            {errors.email}
          </FormHelperText>
        </FormControl>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Country"
              name="phone_number_prefix"
              value={formData.phone_number_prefix}
              onChange={handleChange}
              className={classes.formControl}
            >
              {phonePrefixOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              className={classes.formControl}
              error={Boolean(errors.phone_number)}
            >
              <TextField
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
              />
              <FormHelperText className={classes.error}>
                {errors.phone_number}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl
          fullWidth
          className={classes.formControl}
          error={Boolean(errors.address)}
        >
          <TextField
            fullWidth
            //margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormHelperText className={classes.error}>
            {errors.address}
          </FormHelperText>
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors.about)}
          className={classes.formControl}
        >
          <TextField
            fullWidth
            //margin="normal"
            label="About"
            name="about"
            value={formData.about}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <FormHelperText className={classes.error} margin="normal">
            {errors.about}
          </FormHelperText>
        </FormControl>

        {/* Add more fields here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModalClose(dispatch)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={disableSubmitButton}
        >
          {modal?.data?._id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default CreateEditContact;
