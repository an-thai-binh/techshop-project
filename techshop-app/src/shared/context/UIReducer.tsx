export interface State {
    isModalOpen: boolean;
    isDropdownOpen: boolean;
    isTooltipOpen: boolean;
    isSidebarOpen: boolean;
    isCatalogOpen: boolean;
}

export type Action = | { type: "TOGGLE_MODAL"}
                    | { type: "TOGGLE_DROPDOWN"}
                    | { type: "TOGGLE_TOOLTIP"}
                    | { type: "TOGGLE_SIDEBAR"}
                    | { type: "TOGGLE_CATALOG"}
                    | { type: "CLOSE_ALL"};

export const initialState:State = {
    isModalOpen: false,
    isDropdownOpen: false,
    isTooltipOpen: false,
    isSidebarOpen: false,
    isCatalogOpen: false
}

export const UIReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return {...state, isModalOpen: !state.isModalOpen};
        case "TOGGLE_DROPDOWN":
            return {...state, isDropdownOpen: !state.isDropdownOpen};
        case "TOGGLE_TOOLTIP":
            return {...state, isTooltipOpen: !state.isTooltipOpen};
        case "TOGGLE_SIDEBAR":
            return {...state, isSidebarOpen: !state.isSidebarOpen};
        case "TOGGLE_CATALOG":
            return {...state, isCatalogOpen: !state.isCatalogOpen};
        case "CLOSE_ALL":
            return {...state, isModalOpen: false, isDropdownOpen: false, isTooltipOpen: false, isSidebarOpen: false, isCatalogOpen: false};
        default:
            return state;
    }
}