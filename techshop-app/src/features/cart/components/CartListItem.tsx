import CartItem from '@/features/cart/components/CartItem'
import { selectCartItems } from '@/features/cart/cartSelectors'
import { useSelector } from 'react-redux'

export default function CartListItem() {
  const items = useSelector(selectCartItems)
  return (
    <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
      <div className="size-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800">
        <div className="mx-1 flex flex-col justify-start gap-4">
          {/* ItemCart */}
          {/*<CartItem />*/}
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
