import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material'
import tempOrders, { OrderItem, OrderModel } from '../../../data/orders'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderCard from '../../../components/cards/order_card';


export default function Orders() {
    return (
        <Box px={2} >
            <Toolbar />
            <Toolbar />
            <List>
                {
                    tempOrders?.map((item: OrderModel, index: number) => (
                        <Accordion key={index} sx={{ bgcolor: 'transparent' }} elevation={0}  >
                            <AccordionSummary
                                expandIcon={<div />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography fontSize={24} fontWeight={700}>{item?.orderNo}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                               {
                                item?.orderItems?.map((order: OrderItem, key: number) => (
                                    <OrderCard key={key} order={order}  />
                                ))
                               }
                            </AccordionDetails>
                        </Accordion>

                    ))
                }
            </List>

        </Box>
    )
}
