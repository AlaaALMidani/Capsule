import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import { red } from '@mui/material/colors';

// Updated Post Component
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

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
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
    </div>
  );
}
