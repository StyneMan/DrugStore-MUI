import { Typography, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import Box from "@mui/system/Box"
import { useNavigate } from "react-router-dom"

type OpenRegProp = {
    setOpen: any;
}

const OpenRegisterForm = ({setOpen} : OpenRegProp) => {

    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        amount: Yup.string().required('Cash in hand is required!'),
    });

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log("AMOUNT", values.amount);

            setOpen(false);
            
            setTimeout(() => {
                navigate('/dashboard')
            }, 1000);
            
        }
    });

    const {errors, values, handleChange, handleSubmit, touched} = formik;


  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} width={360} >        
        <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'stretch'} width={'100%'} >
            <Box>
                <Typography gutterBottom >
                    Cash in Hand
                </Typography>
                <TextField placeholder='Enter Amount' variant='filled' value={values.amount} onChange={handleChange} error={Boolean(touched.amount && errors.amount)} name='amount' fullWidth helperText={touched.amount && errors.amount} />
            </Box>
        </Box>
        <br/>
        <br/>
        <Button  onClick={handleSubmit} variant="contained" fullWidth sx={{padding: 2, textTransform: 'capitalize'}}  >
            Open Register
        </Button>
    </Box>
  )
}

export default OpenRegisterForm