import { ADD_TO_BUDGETLIST } from "./Constants";

const initialState=[];

export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_BUDGETLIST:
            return [
                ...state,
                action.data
            ]

        default:
            return state
    }

}