import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Post({
  description,          
  profilePhoto,         
  postPhoto,           
  pharmacyName,        
  postDate        
}) {
  const [liked, setLiked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Edit option selected");
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete option selected");
    handleMenuClose();
  };

  return (
    <div className="flex justify-center">
      <Card
        sx={{
          width: {
            xs: '100%',
            sm: '75%',
            md: '50%'
          },
          height: 'auto'
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                'P'
              )}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={pharmacyName || 'Pharmacy Name'}
          subheader={postDate || 'September 14, 2016'}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description || 'Post description goes here.'}
          </Typography>
        </CardContent>
        {postPhoto && (
          <CardMedia
            component="img"
            height="194"
            image={postPhoto}
            alt="Post image"
          />
        )}
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Order it now
          </Button>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon sx={{ color: liked ? red[500] : 'inherit', fontSize: 30 }} />
          </IconButton>
        </CardActions>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Card>
    </div>
  );
}
export default Post;
