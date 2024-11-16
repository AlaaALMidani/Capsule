import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import med from './med.jpg';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export function Post() {
  const [liked, setLiked] = React.useState(false); 

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className='flex justify-center '>
    <Card className='w-3/4 h-3/4 '> 
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
    </div>
  );
}
