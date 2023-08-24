import { ADD_TO_BUDGETLIST } from "./Constants";

export function addToBudgetList(item){
    return {
        type:ADD_TO_BUDGETLIST,
        data:item
    }
}