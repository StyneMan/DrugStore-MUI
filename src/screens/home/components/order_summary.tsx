import { Box, Button, Card, Grid, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { tempPaymentMethods } from '../../../data/payment_methods';


export default function OrderSummary() {
    const [deviceType, setDeviceType] = React.useState("mobile");
    const customSlider: React.RefObject<Slider> = React.createRef();

    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.only("sm"));

    React.useEffect(() => {
        if (tablet) {
            setDeviceType("tablet");
        } else {
            setDeviceType("pc");
        }
    }, []);

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesPerRow: 1,
        slidesToScroll: 1,
    };


    return (
        <Card  >
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'stretch'} >
                <Grid px={4} pt={4} container spacing={2} justifyContent={'space-between'} alignItems={'center'}  >
                    <Grid item sm={6} md={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'stretch'} >
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                            <Typography>
                                Sub Total
                            </Typography>
                            <Typography>
                                ₦0.00
                            </Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                            <Typography>
                                Total Discount
                            </Typography>
                            <Typography>
                                ₦0.00
                            </Typography>
                        </Box>

                    </Grid>

                    <Grid item sm={6} md={6} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'stretch'} >
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                            <Typography>
                                Tax
                            </Typography>
                            <Typography textAlign={'end'}>
                                ₦0.00
                            </Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                            <Typography>
                                Total
                            </Typography>
                            <Typography textAlign={'end'} fontSize={18} fontWeight={700}>
                                ₦0.00
                            </Typography>
                        </Box>

                    </Grid>
                </Grid>

                <Box py={2} px={4} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'stretch'}>
                    <Typography gutterBottom={true} >
                        Payment Method
                    </Typography>
                    <Slider {...settings} ref={customSlider}>
                        {tempPaymentMethods?.map((item: any, index: number) => (
                            <Box key={index} px={4} {...item} mx={2} width={70} borderRadius={1}  >
                                <Box bgcolor={'#A9B8C6'} width={112} display={'flex'} p={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}  >
                                    {item?.icon}
                                    <Typography fontSize={13} textAlign={'center'}>
                                        {item?.name}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>

                <Box p={4} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'}>
                        <Button variant='contained' sx={{ p: 1, width: 156, }}  >
                            Place Order
                        </Button>
                        <Button variant='contained' sx={{ p: 1, mx: 2, width: 96, bgcolor: '#CCE4F2', color: 'black' }}  >
                            Save Draft
                        </Button>
                    </Box>
                    <Button variant='text' sx={{ p: 1, width: 156, }}  >
                        Delete Order
                    </Button>

                </Box>
            </Box>
        </Card>
    )
}
