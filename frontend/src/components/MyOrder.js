import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export function MyOrder({ order }) {
  return (
    <Card
      className="shadow-lg rounded-lg overflow-hidden"
      sx={{
      
       boxShadow: '10',
      }}
    >
      <CardHeader
        subheader={
          <Typography sx={{ color: '#1b8942' }}>
            Created on: {order.createdAt} 
          </Typography>
        }
      />
      
      <CardContent>
        <CardMedia
          component="img"
          image={order.photo}
          alt="Order photo"
          sx={{ objectFit: 'cover', height: 'auto', width: 'auto' }}  
        />
        <Typography variant="body2" sx={{ color: '#103758', fontSize: '14px' }}>
          {order.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="p-4">
        <Typography variant="body2" sx={{ color: '#2e7d32', fontSize: '14px' }}>
          Location: {order.location}
        </Typography>
      </CardActions>
    </Card>
  );
}
