import { ArrowBack } from '@mui/icons-material'
import { Box, Button, IconButton, Select, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddCustomer() {
    const navigate = useNavigate();
    return (
        <Box height={'100vh'} width={'100vw'}>
            <Toolbar />
            <Toolbar />
            <Box display='flex' flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} px={3} >
                <Box display='flex' flexDirection={'row'} justifyContent={'start'} alignItems={'center'}>
                    <IconButton onClick={() => navigate('/dashboard/')} >
                        <ArrowBack sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography color={'black'} fontSize={21} fontWeight={800} px={1}  >
                        New Customer
                    </Typography>
                </Box>
                <Select>

                </Select>
            </Box>
        </Box>
    )
}
