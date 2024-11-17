import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
<<<<<<< HEAD
import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
=======
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
>>>>>>> b2e60f9311c43168b2006579e1d319e64be54d86
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';

<<<<<<< HEAD

export function Post({
  title,
  content,
  image,
  video,
  pdf,
  likesCount,
  isLiked,
}) {
  const [liked, setLiked] = React.useState(isLiked);
=======
 function Post() {
  const [liked, setLiked] = React.useState(false); 
>>>>>>> b2e60f9311c43168b2006579e1d319e64be54d86

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center">
      <Card className="w-full">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {title.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={new Date().toLocaleDateString()}
        />

        {/* Conditionally Render Image, Video, or PDF */}
        {image && (
          <CardMedia component="img" height="200" image={image} alt="Product Image" />
        )}
        {video && (
          <CardMedia component="video" height="200" controls src={video} alt="Product Video" />
        )}
        {pdf && (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                View PDF Manual
              </a>
            </Typography>
          </CardContent>
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Order it now
          </Button>
          <div className="flex items-center">
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              <FavoriteIcon
                sx={{ color: liked ? red[500] : 'inherit', fontSize: 30 }}
              />
            </IconButton>
            <Typography variant="body2">{likesCount} Likes</Typography>
          </div>
        </CardActions>
      </Card>
=======
    <div className='flex justify-center '>
    <Card className='w-1/2 h-1/4 '> 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Pharmacy Name"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Post description
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="194"
        image={med}
        alt="image/video"
      />
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          Order it now
        </Button>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon sx={{ color: liked ? red[500] : 'inherit', fontSize: 30 }} />
        </IconButton>
      </CardActions>
    </Card>
>>>>>>> b2e60f9311c43168b2006579e1d319e64be54d86
    </div>
  );
}
export default Post;
