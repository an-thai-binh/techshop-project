export interface State {
  isModalVisible: boolean
  isDropdownVisible: boolean
  isTooltipVisible: boolean
  isSidebarVisible: boolean
  isCatalogVisible: boolean
  isPopupVisible: boolean
  modalType: 'login' | 'register' | 'forgot' | null
  dropdownType: 'search' | 'cart' | null
  popupType: 'cart' | null
  isOverlayVisible: boolean
}

export type Action =
  | { type: 'OPEN_MODAL'; payload: { modalType: State['modalType'] } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_DROPDOWN'; payload: { dropdownType: State['dropdownType'] } }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'OPEN_POPUP'; payload: { popupType: State['popupType'] } }
  | { type: 'CLOSE_POPUP' }
  | { type: 'TOGGLE_TOOLTIP' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_CATALOG' }
  | { type: 'CLOSE_ALL' }
  | { type: 'SHOW_OVERLAY' }
  | { type: 'HIDE_OVERLAY' }
