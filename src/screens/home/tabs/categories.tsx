import { Grid } from '@mui/material'
import React from 'react'
import tempCategories, { CategoryModel } from '../../../data/categories'
import CategoryCard from '../../../components/cards/category_card'

export default function CategoriesTab() {
  return (
    <Grid container spacing={2} mt={2} >
        {
            tempCategories?.map((item: CategoryModel, index: number) => (
                <Grid key={index} item sm={4} md={4} lg={3}>
                    <CategoryCard item={item}  />
                </Grid>
            ))
        }
    </Grid>
  )
}
