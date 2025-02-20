type OrderListType = {
    id: number,
    recipientName: string,
    phone: string,
    address: string,
    deliveryMethods: string,
    dateToDeliver: string,
    instructions: string,
    status: string,
    paymentStatus: string,
    deliverySubtypeId: number,
    name: string,
    rate: number,
    businessName: string
}

type DeliverySubtype = {
    id: number,
    name: string,
    rate: number,
    orders: OrderListType[]
}

type OrderDetailsType = {

    id: nummber,
    recipientName: string,
    phone: string,
    address: string,
    deliveryMethods: string,
    dateToDeliver: string,
    instructions: string,
    status: string,
    paymentStatus: string,
    userId: number,
    user: null | object,
    deliverySubtypeId: number,
    isNew: boolean,
    signatureImagePath: string,
    deliverySubtype: {
        id: number,
        name: string,
        rate: number,
        orders: OrderListType[]
    },
    registerId: number,
    register: null
}




export { OrderListType, OrderDetailsType, DeliverySubtype }