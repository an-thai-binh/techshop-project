import { Action, State } from '@/types/ui'

export const initialState: State = {
  theme: 'dark',
  isModalVisible: false,
  isDropdownVisible: false,
  isTooltipVisible: false,
  isSidebarVisible: false,
  isCatalogVisible: false,
  isPopupVisible: false,
  modalType: null,
  dropdownType: null,
  popupType: null,
  isOverlayVisible: false,
}

export const UIReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      }
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload.modalType,
        isOverlayVisible: true,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalVisible: false,
        modalType: null,
        isOverlayVisible: false,
      }
    case 'OPEN_DROPDOWN':
      return {
        ...state,
        isDropdownVisible: true,
        dropdownType: action.payload.dropdownType,
        isOverlayVisible: true,
      }
    case 'CLOSE_DROPDOWN':
      return {
        ...state,
        isDropdownVisible: false,
        dropdownType: null,
        isOverlayVisible: false,
      }
    case 'OPEN_POPUP':
      return {
        ...state,
        isPopupVisible: true,
        popupType: action.payload.popupType,
        isOverlayVisible: true,
      }
    case 'CLOSE_POPUP':
      return {
        ...state,
        isPopupVisible: false,
        popupType: null,
        isOverlayVisible: false,
      }
    case 'TOGGLE_TOOLTIP':
      return { ...state, isTooltipVisible: !state.isTooltipVisible }
    case 'TOGGLE_SIDEBAR':
      const nextStateSidebar = !state.isSidebarVisible
      return { ...state, isSidebarVisible: nextStateSidebar, isOverlayVisible: nextStateSidebar }
    case 'TOGGLE_CATALOG':
      return { ...state, isCatalogVisible: !state.isCatalogVisible }
    case 'CLOSE_ALL':
      return {
        ...state,
        isModalVisible: false,
        isDropdownVisible: false,
        isTooltipVisible: false,
        isSidebarVisible: false,
        isCatalogVisible: false,
        isPopupVisible: false,
        modalType: null,
        dropdownType: null,
        popupType: null,
        isOverlayVisible: false,
      }
    case 'SHOW_OVERLAY':
      return {
        ...state,
        isOverlayVisible: true,
      }
    case 'HIDE_OVERLAY':
      return {
        ...state,
        isOverlayVisible: false,
      }
    default:
      return state
  }
}
