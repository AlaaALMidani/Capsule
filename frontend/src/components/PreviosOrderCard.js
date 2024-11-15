import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

export function PreviosOrderCard() {
  return (
    
    <Card className='w-1/3 '>
      <CardHeader
        
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Roshita photo"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          2 packets sytamol 
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          1 packet sytamol 
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