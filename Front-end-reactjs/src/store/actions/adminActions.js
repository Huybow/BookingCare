import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getAllSpecialty,
    getAllClinic, deleteSpecialtyService, editSpecialtyService, deleteClinicService, editClinicService,
    getAllHandbook, deleteHandbookService,editHandbookService
} from '../../services/userService';
import { toast } from 'react-toastify';

//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error: ", e);
        }
    }

}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositonStart error: ", e);
        }
    }

}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

//Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error: ", e);
        }
    }

}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})



//get all user

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch all user error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all user error!");
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsers error: ", e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

//Create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create a new user error!");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Create a new user error!");
            dispatch(saveUserFailed());
            console.log("createSaveUser error: ", e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

//Delete user
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log("deleteUser error: ", e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

//Edit user
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user success!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update the user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log("editUser error: ", e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})



export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save infor detail Doctor success!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save infor detail Doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save infor detail Doctor error!");
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}
//get time
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0 && resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforStart error: ", e);
        }
    }

}



export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})


//Specialty

export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data.reverse()));
            } else {
                toast.error('Fetch all specialty error!')
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (e) {
            toast.error('Fetch all specialty error!')
            dispatch(fetchAllSpecialtyFailed());
            console.log("fetchAllSpecialtyFailed error: ", e);
        }
    }
}


export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    specialty: data
})

export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
})

//Delete specialty

export const deleteSpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success("Delete the specialty success!");
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                toast.error("Delete the specialty error!");
                dispatch(deleteSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Delete the specialty error!");
            dispatch(deleteSpecialtyFailed());
            console.log("deleteSpecialty error: ", e);
        }
    }
}

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
})

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED,
})

//Edit specialty

export const editSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the specialty success!");
                dispatch(editSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                toast.error("Update the specialty error!");
                dispatch(editSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Update the specialty error!");
            dispatch(editSpecialtyFailed());
            console.log("editSpecialty error: ", e);
        }
    }
}

export const editSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
})

export const editSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED,
})


//Clinic

export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data.reverse()));
            } else {
                toast.error('Fetch all clinic error!')
                dispatch(fetchAllClinicFailed());
            }
        } catch (e) {
            toast.error('Fetch all clinic error!')
            dispatch(fetchAllClinicFailed());
            console.log("fetchAllClinicFailed error: ", e);
        }
    }
}


export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    clinic: data
})

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED,
})

//Delete clinic


export const deleteClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success("Delete the clinic success!");
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error("Delete the clinic error!");
                dispatch(deleteClinicFailed());
            }
        } catch (e) {
            toast.error("Delete the clinic error!");
            dispatch(deleteClinicFailed());
            console.log("deleteClinic error: ", e);
        }
    }
}

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS,
})

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED,
})



//Edit clinic

export const editClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the clinic success!");
                dispatch(editClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error("Update the clinic error!");
                dispatch(editClinicFailed());
            }
        } catch (e) {
            toast.error("Update the clinic error!");
            dispatch(editClinicFailed());
            console.log("editClinic error: ", e);
        }
    }
}

export const editClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS,
})

export const editClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED,
})


//Handbook

export const fetchAllHandbookStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllHandbook('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllHandbookSuccess(res.data.reverse()));
            } else {
                toast.error('Fetch all handbook error!')
                dispatch(fetchAllHandbookFailed());
            }
        } catch (e) {
            toast.error('Fetch all handbook error!')
            dispatch(fetchAllHandbookFailed());
            console.log("fetchAllHandbookFailed error: ", e);
        }
    }
}


export const fetchAllHandbookSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
    handbook: data
})

export const fetchAllHandbookFailed = () => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_FAILED,
})

//Delete handbook

export const deleteHandbook = (handbookId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteHandbookService(handbookId);
            if (res && res.errCode === 0) {
                toast.success("Delete the handbook success!");
                dispatch(deleteHandbookSuccess());
                dispatch(fetchAllHandbookStart());
            } else {
                toast.error("Delete the handbook error!");
                dispatch(deleteHandbookFailed());
            }
        } catch (e) {
            toast.error("Delete the handbook error!");
            dispatch(deleteHandbookFailed());
            console.log("deleteHandbook error: ", e);
        }
    }
}

export const deleteHandbookSuccess = () => ({
    type: actionTypes.DELETE_HANDBOOK_SUCCESS,
})

export const deleteHandbookFailed = () => ({
    type: actionTypes.DELETE_HANDBOOK_FAILED,
})

//Edit handbook

export const editHandbook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editHandbookService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the clinic success!");
                dispatch(editHandbookSuccess());
                dispatch(fetchAllHandbookStart());
            } else {
                toast.error("Update the clinic error!");
                dispatch(editHandbookFailed());
            }
        } catch (e) {
            toast.error("Update the clinic error!");
            dispatch(editHandbookFailed());
            console.log("editClinic error: ", e);
        }
    }
}

export const editHandbookSuccess = () => ({
    type: actionTypes.EDIT_HANDBOOK_SUCCESS,
})

export const editHandbookFailed = () => ({
    type: actionTypes.EDIT_HANDBOOK_FAILED,
})