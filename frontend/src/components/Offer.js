import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check'; 

export function Offer() {
  return (
    <div className='flex justify-center'>
    <Card className='w-3/4'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Offer 1
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Offer message
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}> {/* محاذاة الزر إلى اليمين */}
        <Button variant="contained" color="success" startIcon={<CheckIcon />}>
          Accept Order
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}