import { UpdatePriceEntity } from '@/types/UpdateProductPrice'
import ProductItem from './components/ProductItem'
import { Stack, Typography } from '@mui/material'

type Props = {
  products: UpdatePriceEntity[]
}

export default function ProductList({products}: Props) {
  return (
    <Stack spacing={1}>
      <Typography>Confirmação</Typography>
      {products.map((product, index) => (
        <ProductItem key={`${product.name}${index}`} product={product} />
      ))}
    </Stack>
  )
}
