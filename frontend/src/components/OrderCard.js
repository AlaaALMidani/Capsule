import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

export function OrderCard({
  order,
  role,
  isCurrentOrder,
  onCancel,
  onView,
  onResend,
  onAddOffer,
  onAcceptOrder,
}) {
  return (
    <Card className='w-1/3 mb-4'>
      <CardHeader subheader={order.createdAt} />
      <CardMedia
        component='img'
        height='194'
        image={order.photo}
        alt='Order photo'
      />
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {order.message}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Location: {order.location}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        {/* Role-based buttons */}
        {/* Customer Actions */}
        {role === 'customer' && (
          <>
            {isCurrentOrder ? (
              <Button
                variant='contained'
                color='error'
                startIcon={<CancelIcon />}
                onClick={() => onCancel(order._id)}
              >
                Cancel Order
              </Button>
            ) : (
              <Button
                variant='contained'
                color='success'
                startIcon={<ReplayIcon />}
                onClick={() => onResend(order._id)}
              >
                Reorder
              </Button>
            )}
          </>
        )}

        {/* Pharmacy Actions */}
        {role === 'pharmacy' && (
          <>
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              onClick={() => onAddOffer(order._id)}
            >
              Add Offer
            </Button>
            <Button
              variant='contained'
              color='info'
              startIcon={<VisibilityIcon />}
              onClick={() => onView(order._id)}
            >
              View Order
            </Button>
          </>
        )}

        {/* Supplier Actions */}
        {role === 'supplier' && (
          <Button
            variant='contained'
            color='info'
            startIcon={<VisibilityIcon />}
            onClick={() => onView(order._id)}
          >
            View Pharmacy Order
          </Button>
        )}

        {/* Delivery Actions */}
        {role === 'delivery' && (
          <>
            <Button
              variant='contained'
              color='success'
              startIcon={<VisibilityIcon />}
              onClick={() => onAcceptOrder(order._id)}
            >
              Accept Order
            </Button>
            <Button
              variant='contained'
              color='info'
              startIcon={<VisibilityIcon />}
              onClick={() => onView(order._id)}
            >
              View Offer
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
