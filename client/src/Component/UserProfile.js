import * as React from "react";
import { Avatar, Box, Divider, Typography, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ContactContext } from "../Context/ContactContext";
import { wHeight } from "../Constant/general";

const UserProfile = () => {
  const {
    state: { userProfile, loadGetAllContacts, contactList },
  } = React.useContext(ContactContext);

  const theme = useTheme();

  const contentMemo = React.useMemo(() => {
    if (loadGetAllContacts) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper,
            maxHeight: wHeight,
            minHeight: wHeight,
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    } else {
      return userProfile ? (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Avatar
              src={userProfile?.imageURL || ""}
              alt="UserProfile Photo"
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <Typography variant="h5" gutterBottom textTransform={"capitalize"}>
              {userProfile.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.background.default,
              flex: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Personal Information
              <Divider />
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone Number :</strong>{" "}
              {`${userProfile.phone_number_prefix} ${userProfile.phone_number}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email :</strong> {userProfile?.email?.toLowerCase()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address :</strong> {userProfile?.address || "N.A"}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Typography variant="h6" gutterBottom>
              About
              <Divider />
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                maxHeight: wHeight,
                height: "calc(100vh - 630px) !important",
              }}
            >
              {userProfile?.description.substring(0, 370) || "N.A"}
            </Typography>
          </Box>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            padding: 3,
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: theme.palette.background.default,
            maxHeight: "calc(100vh - 137px) !important",
            minHeight: "calc(100vh - 137px) !important",
            alignContent: "center !important",
            textAlign: "center !important",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {contactList.length > 0
              ? "Please select user from contact list."
              : "Oops, No users found."}
          </Typography>
        </Box>
      );
    }
  }, [
    contactList.length,
    loadGetAllContacts,
    theme.palette.background.default,
    theme.palette.background.paper,
    userProfile,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "0 1px 0 15px",
      }}
    >
      {contentMemo}
    </Box>
  );
};

export default UserProfile;
