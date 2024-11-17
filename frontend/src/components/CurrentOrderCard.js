import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel'; 
import CardActions from '@mui/material/CardActions';

export function CurrentOrderCard({content, currentOrderPhoto}) {
  return (
    <Card  className='w-1/3 '>
      <CardHeader
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={currentOrderPhoto}
        alt="Roshita photo"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {content}
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="error" startIcon={<CancelIcon />}> 
          Cancel order
        </Button>
      </CardActions>
    </Card>
  );
}

