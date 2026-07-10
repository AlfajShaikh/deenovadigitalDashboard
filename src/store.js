import { configureStore } from "@reduxjs/toolkit";
import staffEntryReducer from './components/Staff/StaffEntry/staffEntrySlice'
import requirementEnquiryReducer from './components/Product/AddRequirement/RequirementEnquiry/requirementEnquirySlice'
import loginReducer from './components/Login/loginSlice'
import sendPaymentReducer from './components/Payments/SendPayments/sendPaymentsSlice'
import estimateReducer from './components/Product//AddRequirement/Estimation/estimationSlice'
import homeReducer from './components/Home/homeSlice'


export const store = configureStore({
    reducer: {
        home:homeReducer,
    staffEntry:staffEntryReducer,
    requirementEnquiry:requirementEnquiryReducer,
    auth:loginReducer,
    sendPayment:sendPaymentReducer,
    estimate:estimateReducer

    },
});