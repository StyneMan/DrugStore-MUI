import CreditCardIcon from '@mui/icons-material/CreditCard';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import PaymentsIcon from '@mui/icons-material/Payments';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const tempPaymentMethods = [
    {name: 'Cash', icon: <PaymentsIcon/>},
    {name: 'POS', icon: <CreditCardIcon/>},
    {name: 'Transfer', icon: <SendToMobileIcon/> },
    {name: 'Customer Credit', icon: <CreditCardIcon/>},
    {name: 'Others', icon: <PermIdentityIcon/>},
]