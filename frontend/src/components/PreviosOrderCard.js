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
    <Card sx={{ boxShadow: '5'
    }} className='w-full'>
      <CardHeader 
        title={order.title}
        subheader={
          <Typography sx={{ color: '#1b8942' }}>
            {order.createdAt}  
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={order.photo} 
        alt="Order photo"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: '#103758', fontSize: '14px' }}>
          {order.message} {/* Assuming message is part of the order object */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success" startIcon={<ReplayIcon />}>
          Resend order
        </Button>
      </CardActions>
    </Card>
  );
}
