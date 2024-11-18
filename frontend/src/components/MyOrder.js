import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export function MyOrder({ order }) {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardHeader
        subheader={`Created on: ${order.createdAt}`}
      />
      
      <CardContent>
        <CardMedia
          component="img"
 
          image={order.photo}
          alt="Order photo"
          sx={{ objectFit: 'cover', height:'200px', width:'full'}}  
        />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {order.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="p-4">
        <Typography variant="body2" className="font-semibold">
          Location: {order.location}
        </Typography>
      </CardActions>
    </Card>
  );
}
