import { ProductType } from '@/features/product/types/ProductType'
import { ChoiceType } from '@/features/product/types/ProductChoiceType'
import { RootState } from '@/shared/redux/store'

export const selectProducts = (state: RootState): ProductType[] => state.product.items
export const selectChoices = (state: RootState): ChoiceType[] => state.product.choices
export const selectSelectedChoices = (state: RootState): Record<number, number> =>
  state.product.selectedChoices
