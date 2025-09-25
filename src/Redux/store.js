import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension"; 
import { userCreateReducer, userListReducer, userLoginReducer, userUpdateProfileReducer } from "./Reducers/userReducer";
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from "./Reducers/ProductReducer";
import { orderDetailsReducer, ordersListReducer } from "./Reducers/orderReducer";
import { depenseCreateReducer, depenseDeleteReducer, depenseEditReducer, depenseListReducer, depenseUpdateReducer } from "./Reducers/DepenseReducer";    
import { documentCreateReducer, documentDeleteReducer, documentEditReducer, documentListReducer, documentUpdateReducer } from "./Reducers/documentReducer";
import { consultationReportReducer } from "./Reducers/reportConsultation";
import { documentConsultReducer } from "./Reducers/DocumentReducers.consultation";

const reducer = combineReducers({
  userLogin: userLoginReducer, 
  userList:userListReducer,

  productList:productListReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productEdit:productEditReducer,
  productUpdate:productUpdateReducer,
  orderList:ordersListReducer,
  orderDetails:orderDetailsReducer, 
  
  depenseList:depenseListReducer,
  depenseDelete:depenseDeleteReducer,
  depenseCreate:depenseCreateReducer,
  depenseEdit:depenseEditReducer,
  depenseUpdate:depenseUpdateReducer,  

  documentList: documentListReducer,
  documentDelete:documentDeleteReducer, 
  documentCreate: documentCreateReducer,
  documentEdit: documentEditReducer,
  documentUpdate : documentUpdateReducer,
  consultationReport :consultationReportReducer,
  documentConsult:documentConsultReducer,
  userUpdateProfile: userUpdateProfileReducer, 
  userCreate :userCreateReducer,
 
})

 
//login

const UserInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo")) 
:null; 
  
 
const initialState = {  
userLogin:{ userInfo:UserInfoFromLocalStorage },
} 

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
