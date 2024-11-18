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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {offerMessage}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" color="success" startIcon={<CheckIcon />}>
          Accept Offer
        </Button>
      </CardActions>
    </Card>
  );
}
