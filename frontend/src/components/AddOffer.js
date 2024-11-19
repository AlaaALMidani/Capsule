import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check'; 

export function AddOffer({offerMessage,cost}) {
  return (
    <div className='flex justify-center'>
    <Card className='w-3/4'>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {offerMessage}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {cost}
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
