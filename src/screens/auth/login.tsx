import { Box, Grid } from '@mui/material'
import React from 'react'
import logo from "../../assets/images/virtualrx_logo.svg"
import image from "../../assets/images/clock_image.svg"
import ClockInForm from '../../components/forms/login'

const LoginScreen = () => {
  return (
        <Grid container  height={"100vh"} width={'100vw'} >
            <Grid item sm={6} md={6} >
                <Box bgcolor={'#C6D2DD'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'stretch'} >
                    <img src={logo} alt='' width={128} style={{padding: 16}} />
                    <Box flexGrow={1}  display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                    <img src={image} alt='' width={'60%'} style={{padding: 16}} />
                    </Box>
                </Box>
            </Grid>
            <Grid item sm={6} md={6} >
                <Box bgcolor={'white'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'stretch'} >
                    <Box flexGrow={1}  display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                       <ClockInForm />
                    </Box>
                </Box>
            </Grid>

        </Grid>
  )
}

export default LoginScreen