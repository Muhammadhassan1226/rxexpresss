interface OrderType {
  id: number;
  recipientName: string;
  phone: string;
  address: string;
  deliveryMethods: string;
  dateToDeliver: string;
  instructions: string;
  status: string;
  paymentStatus: "Cash On Delivery" | "Paid" | string | "COPAY" | "CoPay" | "copay";
  deliverySubtypeId: number;
  name: string;
  rate: number;
  businessName: string;
  signatureImageUrl?: string;
  deliverySubtypeName: string;
  deliveryRate: number;
}

interface OrderResponse {
  totalOrders: number;
  orders: OrderType[];
}

export { OrderResponse, OrderType };
