import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: [],
    allSpecialty: [],
    allClinic: [],
    allHandbook: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;  //thêm isLoadingGender để phân biệt khi nào API đc gọi xong
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        //Position
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;  //thêm isLoadingPosition để phân biệt khi nào API đc gọi xong
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            state.positions = [];
            return {
                ...state,
            }
        //Role
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;  //thêm isLoadingRole để phân biệt khi nào API đc gọi xong
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false;
            state.roles = [];
            return {
                ...state,
            }
        //get all user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
                state.users = action.users;
                return {
                    ...state,
            }
        //get top doctors
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
        }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
        }
        //get all doctors
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
        }
        //get time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data; 
            return {
                ...state,
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
        }
        //specialty
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.specialty;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.allSpecialty = [];
            return {
                ...state,
        }

        //Clinic
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinic = action.clinic;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.allClinic = [];
            return {
                ...state,
        }

        //Handbook
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.allHandbook = action.handbook;
            return {
                ...state,
        }
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.allHandbook = [];
            return {
                ...state,
        }
        default:
            return state;
    }
}

export default adminReducer;