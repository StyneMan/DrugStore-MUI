import { Grid } from '@mui/material'
import React from 'react'
import tempProducts, { ProductModel } from '../../../data/products'
import ProductCard from '../../../components/cards/product_card'

export default function ProductTab() {
  return (
    <Grid container spacing={2} >
        {
            tempProducts?.map((item: ProductModel, index: number) => (
                <Grid key={index} item sm={6} md={4} >
                    <ProductCard product={item} />
                </Grid>
            ))
        }
    </Grid>
  )
}
