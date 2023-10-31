import image from "../assets/images/product1.png"

export interface OrderModel {
    orderNo: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    image: string;
    price: number;
    quantity: number;
    title: string;
}



const tempOrders: OrderModel [] = [
    {
       orderNo: 'Order #33',
       orderItems: [
        {
            image: image,
            price: 10000,
            title: 'Emzor Chloroquine Tab 200mg - 3 in 1',
            quantity: 3,
        }
       ]
    }
]

export default tempOrders;