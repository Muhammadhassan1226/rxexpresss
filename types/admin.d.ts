interface OrderType {
  id: number;
  recipientName: string;
  phone: string;
  address: string;
  deliveryMethods: string;
  dateToDeliver: string;
  instructions: string;
  status: string;
  paymentStatus: "Cash On Delivery" | "Paid";
  deliverySubtypeId: number;
  name: string;
  rate: number;
  businessName: string;
}

interface OrderResponse {
  totalOrders: number;
  orders: OrderType[];
}

export { OrderResponse };
