import CartItem from '@/features/cart/components/CartItem'
import { selectCartItems } from '@/features/cart/cartSelectors'
import { useAppSelector } from '@/shared/redux/hook'

export default function CartListItem() {
  const items = useAppSelector(selectCartItems)
  return (
    <div className="flex grow items-center justify-center overflow-hidden py-0 pl-1">
      <div className="size-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800">
        <div className="mx-1 flex flex-col justify-start gap-4">
          {items?.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  )
}
