import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

export function Offer({ offer }) {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Offer from {offer.senderID}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} className="mb-2">
          {offer.message}
        </Typography>
        <Typography variant="body2" className="font-semibold mb-2">
          Cost: ${offer.cost}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }} className="bg-gray-100 p-2">
        <Button variant="contained" color="success" startIcon={<CheckIcon />}>
          Accept Offer
        </Button>
      </CardActions>
    </Card>
  );
}
