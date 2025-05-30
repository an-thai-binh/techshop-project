export interface ChoiceType {
  id: number
  productId: number
  choiceName: string
  choiceValueList: ChoiceValueType[]
}

export interface ChoiceValueType {
  id: number
  choiceId: number
  choiceValue: string
  skuValue: string
}
