import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

export function PreviosOrderCard({ order }) {
  return (
    <Card className='w-1/3'>
      <CardHeader subheader={order.createdAt} />
      <CardMedia
        component="img"
        height="194"
        image={order.photo}
        alt="Order photo"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {order.message}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Location: {order.location}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success" startIcon={<ReplayIcon />}>
          view order
        </Button>
        <Button variant="contained" color="error" startIcon={<CancelIcon />}>
          Cancel order
        </Button>
      </CardActions>
    </Card>
  );
}
 