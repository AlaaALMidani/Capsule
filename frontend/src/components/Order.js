import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

export function Order({ order }) {

  return (
    <div className='flex justify-center w-screen'>
      <Card sx={{
        width: {
          xs: '100%',
          sm: '75%',
          md: '50%'
        },
        height: 'auto',
        boxShadow: '5'
      }}>
        <CardHeader
          subheader={
            <div className='font-semibold'>
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }).format(new Date(order.createdAt))}
            </div>
          }
        />
        {order.photo ? <CardMedia
          component="img"
          height="194"
          image={order.photo}
          alt="order photo"
        /> : <></>}
        <CardContent>
          <Typography variant="body2" sx={{
            color: '#103758',
            fontSize: '14px',
          }}>
            {order.message}
          </Typography>

        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="success" startIcon={<CheckIcon />}>
            Add Offer
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
