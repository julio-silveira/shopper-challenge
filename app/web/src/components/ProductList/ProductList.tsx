import { UpdatePriceEntity } from '@/types/UpdateProductPrice'
import { Stack, Typography } from '@mui/material'
import React from 'react'

import ProductItem from './components/ProductItem'
type Props = {
  products: UpdatePriceEntity[]
}

export default function ProductList({ products }: Props) {
  return (
    <Stack spacing={1}>
      <Typography>Confirmação</Typography>
      {products.map((product, index) => (
        <ProductItem key={`${product.name}${index}`} product={product} />
      ))}
    </Stack>
  )
}
