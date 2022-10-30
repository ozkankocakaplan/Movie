import { createSlice } from "@reduxjs/toolkit";
export interface IDeleteModal {
    text: string,
    isOpen: boolean,
    handleClose: () => void,
    handleDelete: () => void
}
export const INITIAL_STATE = {
    backgroundBlur: false,
    loginModal: false,
    registerModal: false,
    messageModal: false,
    addListItemModal: false,
    editListItemModal: false,
    addListModal: false,
    editListModal: false,
    editDynamicListModal: false,
    editUserModal: false,
    siteInfoModal: false,
    blockModal: false,
    complaintModal: false,
    rosetteInfoModal: false,
    addReviews: false,
    editReviews: false,
    deleteModal: { text: '', isOpen: false, handleClose: function () { }, handleDelete: function () { } } as IDeleteModal,
    aboutModal: false,
    contentComplaintModal: false

};
export const modalSlice = createSlice({
    name: "modal",
    initialState: { value: INITIAL_STATE },
    reducers: {
        handleOpenBackgroundBlur: (state, action) => {
            state.value.backgroundBlur = action.payload
        },
        handleOpenLoginModal: (state, action) => {
            state.value.loginModal = action.payload
        },
        handleOpenRegisterModal: (state, action) => {
            state.value.registerModal = action.payload
        },
        handleOpenMessageModal: (state, action) => {
            state.value.messageModal = action.payload
        },
        handleOpenAddListItemModal: (state, action) => {
            state.value.addListItemModal = action.payload
        },
        handleOpenEditListItemModal: (state, action) => {
            state.value.editListItemModal = action.payload
        },
        handleOpenAddListModal: (state, action) => {
            state.value.addListModal = action.payload
        },
        handleOpenEditListModal: (state, action) => {
            state.value.editListModal = action.payload
        },
        handleOpenEditUserModal: (state, action) => {
            state.value.editUserModal = action.payload
        },
        handleOpenInfoSiteModal: (state, action) => {
            state.value.siteInfoModal = action.payload
        },
        handleDeleteModal: (state, action) => {
            state.value.deleteModal = action.payload
        },
        handleOpenBlockModal: (state, action) => {
            state.value.blockModal = action.payload
        },
        handleOpenComplaintModal: (state, action) => {
            state.value.complaintModal = action.payload
        },
        handleOpenEditDynamicListModal: (state, action) => {
            state.value.editDynamicListModal = action.payload
        },
        handleOpenRosetteModal: (state, action) => {
            state.value.rosetteInfoModal = action.payload
        },
        handleOpenAddReviews: (state, action) => {
            state.value.addReviews = action.payload
        },
        handleOpenEditReviews: (state, action) => {
            state.value.editReviews = action.payload;
        },
        handleOpenAboutModal: (state, action) => {
            state.value.aboutModal = action.payload
        },
        handleOpenContentComplaintModal: (state, action) => {
            state.value.contentComplaintModal = action.payload
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const {
    handleOpenBackgroundBlur,
    handleOpenLoginModal,
    handleOpenRegisterModal,
    handleOpenMessageModal,
    handleOpenAddListItemModal,
    handleOpenEditListItemModal,
    handleOpenAddListModal,
    handleOpenEditListModal,
    handleOpenEditUserModal,
    handleOpenInfoSiteModal,
    handleDeleteModal,
    handleOpenBlockModal,
    handleOpenComplaintModal,
    handleOpenEditDynamicListModal,
    handleOpenRosetteModal,
    handleOpenAddReviews,
    handleOpenEditReviews,
    handleOpenAboutModal,
    handleOpenContentComplaintModal
} = modalSlice.actions;