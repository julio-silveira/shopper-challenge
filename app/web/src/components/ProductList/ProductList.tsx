import { UpdatePriceEntity } from '@/types/UpdateProductPrice'
import ProductItem from './components/ProductItem'

type Props = {
  products: UpdatePriceEntity[]
}

export default function ProductList({products}: Props) {
  return (
    <div>
      {products.map((product, index) => (
        <ProductItem key={`${product.name}${index}`} product={product} />
      ))}
    </div>
  )
}
