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
import { useState } from 'react';
function Post({
  description,
  profilePhoto,
  postPhoto,
  productName,
  postDate,
  video,
  createdAt,
  isLiked,
  likesCount,
  isMine = false
}) {
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likesCnt, setLikesCount] = useState(likesCount)
  const openMenu = Boolean(anchorEl);

  const handleLike = () => {
   
    if (!liked)
      setLikesCount(likesCnt + 1);
    else
      setLikesCount(likesCnt - 1); 
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
            md: '50%',
          },
          boxShadow: 5,
          borderRadius: '16px',
          overflow: 'hidden',  
          // backgroundColor: '#f9f9f9',
          padding: "20px",
          background: 'rgba(249, 249, 249, 0.8)', 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
          '&:hover': {
          transform: 'scale(1.01)',} 
        
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500], width: 50, height: 50, }} aria-label="profile">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : 'p'
               // (productName.split('')[0])
              }
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={productName || 'Pharmacy Name'}
          subheader={(new Date(createdAt)).getDate|| 'September 14, 2016'}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: '#103758', fontSize: '14px' }}>
            {description || 'Post description goes here.'}
          </Typography>
        </CardContent>
        {postPhoto && ( 
          <CardMedia
            component="img"
            height="200"
            image={postPhoto}
            alt="Post image"
            sx={{
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          />
        )}

        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', px:2, py:1 , borderTop: '3px solid #e0e0e0' }}>
          {isMine ? <></> : <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Order it now
          </Button>}
          <div className='flex ml-3 items-center'>
            <FavoriteIcon sx={{ color: 'inherit', fontSize: 20  }} />
            <div className='pl-2 font-bold'>{likesCnt}</div>
          </div>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon sx={{ color: liked ? red[500] : 'inherit', fontSize: 30 }} />
          </IconButton>
        </CardActions>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Card>
    </div>
  );
}

export default Post;
