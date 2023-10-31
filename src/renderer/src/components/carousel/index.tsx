import React from 'react'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Typography } from '@mui/material'


export default function OrderCarousel() {
  return (
    <div>OrderCarousel</div>
  )
}

const Item = () => {

    return <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <Typography fontSize={14} fontWeight={400} >

        </Typography>
    </Box>
}