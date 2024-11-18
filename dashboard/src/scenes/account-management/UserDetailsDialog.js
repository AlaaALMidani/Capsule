import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, Divider, Avatar } from "@mui/material";
import { MdPhone, MdLocationOn, MdAccessTime, MdShield } from "react-icons/md";
import { motion } from "framer-motion";

const UserDetailsDialog = ({ isOpen, onClose, user }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="user-details-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: 5,
        },
      }}
    >
      {/* Header Section */}
      <DialogTitle id="user-details-dialog-title" sx={{ backgroundColor: "#f5f5f5", padding: "16px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            Profile
          </Typography>
        </Box>
      </DialogTitle>

      <Divider />

      {/* Content Section */}
      <DialogContent>
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ py: 3, textAlign: "center" }}>
              {/* Profile Picture */}
              <Avatar
                alt={user.name}
                src={user.image || "https://via.placeholder.com/150"} // Placeholder if no image provided
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  border: "2px solid #3f51b5",
                }}
              />

              {/* User Name */}
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2, fontWeight: "bold", color: "text.primary" }}
              >
                {user.name}
              </Typography>

              {/* Access Level */}
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                {user.accessLevel}
              </Typography>
            </Box>

            {/* User Details */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ py: 1, px: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
                Contact Information
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <MdPhone size={20} style={{ marginRight: "8px", color: "#3f51b5" }} />
                <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <MdLocationOn size={20} style={{ marginRight: "8px", color: "#3f51b5" }} />
                <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
              </Box>
            </Box>

            {/* Status and Additional Info */}
            <Box sx={{ py: 1, px: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
                Status and Security
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <MdAccessTime size={20} style={{ marginRight: "8px", color: user.active ? "green" : "red" }} />
                <Typography variant="body1">
                  <strong>Status:</strong> {user.active ? "Active" : "Inactive"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <MdShield size={20} style={{ marginRight: "8px", color: "#3f51b5" }} />
                <Typography variant="body1"><strong>Access Level:</strong> {user.accessLevel}</Typography>
              </Box>
            </Box>
          </motion.div>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
            No user selected.
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Footer Section */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </motion.div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
