enum CourierStatus {
    ORDER_PLACED = 'Order Placed',
    PICKED_UP = 'Picked Up',
    IN_TRANSIT = 'In Transit',
    OUT_FOR_DELIVERY = 'Out for Delivery',
    DELIVERED = 'Delivered',
    ATTEMPTED_DELIVERY = 'Attempted Delivery',
    RETURNED_TO_SENDER = 'Returned to Sender',
    ON_HOLD = 'On Hold',
    CANCELLED = 'Cancelled',
    DELAYED = 'Delayed',
    PROCESSING = 'Processing',
    LOST = 'Lost'
}

export default CourierStatus;