interface OverlayState {
  isModalVisible: boolean
  isDropdownVisible: boolean
  isTooltipVisible: boolean
  isSidebarVisible: boolean
  isCatalogVisible: boolean
  isPopupVisible: boolean

  isOverlayVisible: boolean
}
interface OverlayType {
  modalType: 'login' | 'register' | 'forgot' | null
  dropdownType: 'search' | 'cart' | 'user' | null
  popupType: 'cart' | null
}

interface ThemeState {
  theme: 'light' | 'dark'
}

export type State = OverlayState & ThemeState & OverlayType

type ThemeAction =
  | { type: 'SET_THEME'; payload: { theme: State['theme'] } }
  | { type: 'TOGGLE_THEME' }

type OverlayAction =
  | { type: 'OPEN_MODAL'; payload: { modalType: State['modalType'] } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'TOGGLE_DROPDOWN'; payload: { dropdownType: State['dropdownType'] } }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'OPEN_POPUP'; payload: { popupType: State['popupType'] } }
  | { type: 'CLOSE_POPUP' }
  | { type: 'TOGGLE_TOOLTIP' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_CATALOG' }
  | { type: 'CLOSE_ALL' }
  | { type: 'SHOW_OVERLAY' }
  | { type: 'HIDE_OVERLAY' }

export type Action = OverlayAction | ThemeAction
