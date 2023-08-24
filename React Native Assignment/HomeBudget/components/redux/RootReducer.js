import { combineReducers } from "redux";
import {reducer} from "./Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";


const RootReducer= combineReducers({
    reducer
})

const persistConfig={
    key:'root',
    storage:AsyncStorage
};

const persistedReducer=persistReducer(persistConfig,RootReducer);

export default persistedReducer;

