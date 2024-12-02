import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import CancelIcon from '@mui/icons-material/Cancel'; 
import CardActions from '@mui/material/CardActions';
import CheckIcon from '@mui/icons-material/Check';

export function DeliveryComForHome({ productName, description, from, to, cost, image }) {
  return (
    <Card className='w-1/3' sx={{ backgroundColor: 'white' }}> 
      <Typography gutterBottom variant="h5" component="div">
        {productName}
      </Typography>
      
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography> 
        <img src={image} alt="img" className="h-auto " />
        
       
        <Typography variant="body2" sx={{ color: 'black', fontSize: '1.2rem' }}>
          From: {from}
        </Typography>
        <Typography variant="body2" sx={{ color: 'black', fontSize: '1.2rem' }}>
          To: {to}
        </Typography>
        <Typography variant="body2" sx={{ color: 'black', fontSize: '1.2rem' }}>
          Cost: {cost}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" color="success" startIcon={<CheckIcon />}>
          View
        </Button>
        <Button variant="contained" color="error" startIcon={<CancelIcon />}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

 