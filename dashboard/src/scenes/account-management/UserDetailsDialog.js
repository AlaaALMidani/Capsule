import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from "@mui/material";

const UserDetailsDialog = ({ isOpen, onClose, user }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {user ? (
          <Box>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Location: {user.location}</Typography>
            <Typography>Status: {user.active}</Typography>
            <Typography>Access Level: {user.accessLevel}</Typography>
          </Box>
        ) : (
          <Typography>No user selected.</Typography>
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
