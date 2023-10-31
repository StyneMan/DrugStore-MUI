export interface RegisterModel {
    paymentMethod: string;
    sellAmount: string;
    expenses: number;
}

export const tempCurrentRegiser: RegisterModel [] = [
    {
        expenses: 0,
        paymentMethod: 'Cash in hand:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Bank Transfer:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Cash in hand:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Cash in payment:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Cash in hand:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Advance payment:',
        sellAmount: '₦5,000.00'
    },
    {
        expenses: 0,
        paymentMethod: 'Cash in hand:',
        sellAmount: '₦5,000.00'
    }
]