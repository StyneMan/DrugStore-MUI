import { Box, IconButton, TextField, Typography, Button } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import Visible from "@mui/icons-material/Visibility"
import Locked from "@mui/icons-material/VisibilityOff"
// import { useNavigate } from 'react-router-dom';
import CustomDialog from '../dialog';
import OpenRegisterForm from './open_register';

const ClockInForm = () => {

    const [show, setShow] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    // const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required!'),
        password: Yup.string().min(8, "Password too short. Min is 8 chars!").required('Password is required!')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setOpenDialog(true);
            // setTimeout(() => {
            //     navigate('/home')
            // }, 1000);
            
        }
    });

    const {errors, values, handleChange, handleSubmit, touched} = formik;

    const renderDialog = (<Box p={4} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'}  >
        <Typography fontWeight={800} fontSize={26} gutterBottom >Open Register</Typography>
        <br/>
        <OpenRegisterForm setOpen={setOpenDialog} />
    </Box>);

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} width={'60%'} height={'60%'} >
        <CustomDialog open={openDialog} setOpen={setOpenDialog} content={renderDialog} />
        <Box alignItems={'center'}>
            <Typography fontSize={36} fontWeight={800}  >Welcome Back 👋🏽</Typography>
            <Typography fontSize={24} fontWeight={400} textAlign={'center'} >Please clock In</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'stretch'} width={'100%'} >
            <Box>
                <Typography gutterBottom >
                    Username
                </Typography>
                <TextField placeholder='Enter your username'  variant='filled' value={values.username} onChange={handleChange} error={Boolean(touched.username && errors.username)} name='username' fullWidth helperText={touched.username && errors.username} />
            </Box>
            <br/>
            <Box>
                <Typography gutterBottom >
                    Password
                </Typography>
                <TextField variant='filled' placeholder='Enter your password'  value={values.password} type={'password' } onChange={handleChange} error={Boolean(touched.password && errors.password)} name='password' fullWidth helperText={touched.password && errors.password} InputProps={{
                   
                }} />
            </Box>
            
        </Box>
        <br/>
        <Button onClick={handleSubmit} variant="contained" fullWidth sx={{padding: 2, textTransform: 'capitalize'}}  >
            start shift
        </Button>
    </Box>
  )
}

export default ClockInForm