import { Constants } from '../_constants/shared.constants';
const initialState = {};
function homeSuccess(state = initialState, action) {
    switch (action.type) {
        case Constants.manageProfile.MANAGE_PROFILE:
            console.log("mana-----", action.data);
            console.log("mdatataaa", initialState)
            return {
                ...state,
                data: action.data,
            };
        default:
            return state
    }
}
export default homeSuccess;