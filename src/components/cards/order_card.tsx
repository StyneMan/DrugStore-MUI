import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { OrderItem } from '../../data/orders';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface OrderProps {
    order: OrderItem;
}

export default function OrderCard({ order }: OrderProps) {
    const [count, setCount] = React.useState(3);

    return (
        <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'stretch'}  >
            <Box pr={2} >
                <img src={order?.image} width={70} height={70} alt='' />
            </Box>
            <Box flex={1} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}  >
                <Typography fontSize={16} fontWeight={600} >
                    {order?.title}
                </Typography>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'} >
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} bgcolor='#C6D2DD' width={34} height={36} onClick={() => {
                        if (count > 0) { 
                            let newCount = count - 1;
                            setCount(newCount)
                        }
                    }}  >
                        <RemoveIcon />
                    </Box>
                    <Typography p={2} >
                        {count}
                    </Typography>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} bgcolor='#C6D2DD' width={34} height={36} onClick={() => {
                        let newCount = count + 1;
                        setCount(newCount)
                    }}  >
                        <AddIcon />
                    </Box>

                </Box>
            </Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'}>
                <Typography>
                    {`₦${order?.price}`}
                </Typography>
                <Box marginTop={-6} display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'} >
                    <Box   >
                        <DescriptionIcon sx={{ color: 'grey' }} />
                    </Box>
                    <Typography p={1} >
                    </Typography>
                    <Box onClick={() => {
                        let newCount = count + 1;
                        setCount(newCount)
                    }} >
                        <DeleteForeverIcon sx={{ color: 'grey' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
