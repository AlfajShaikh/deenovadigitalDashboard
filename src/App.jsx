import { BrowserRouter, Routes, Route, Router, HashRouter } from "react-router-dom";

import { Header } from "./components/Header/header";
import { Home } from "./components/Home/home";
import { Staff } from "./components/Staff/staff";
import { StaffEntry } from "./components/Staff/StaffEntry/staffEntry";
import { ShowStaffDetails } from "./components/Staff/ShowStaffDetails/showStaffDetails";
import { Product } from "./components/Product/product";
import { AddRequirement } from "./components/Product/AddRequirement/addRequirement";
import { RequirementEnquiry } from "./components/Product/AddRequirement/RequirementEnquiry/requirementEnquiry";
import { RequirementDiscussion } from "./components/Product/AddRequirement/RequirementDiscussion/requirementDiscussion";
import { RequirementApproval } from "./components/Product/AddRequirement/RequirementApproval/requirementApproval";
import { Login } from "./components/Login/login";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { Payments } from "./components/Payments/payments";
import { SendPayments } from "./components/Payments/SendPayments/sendPayments";
import { PaymentHistory } from "./components/Payments/PaymentHistory/paymentHistory";
import { Approval } from "./components/Payments/Approval/approval";
import { Estimation } from "./components/Product/AddRequirement/Estimation/estimation";



function App() {

  

     const isLoggedIn = useSelector(
        (state) => state.auth.success
    );

  return (

    <HashRouter>

      {isLoggedIn && <Header />}

      <Routes>

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

         <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

          <Route
          path="/payments/sendpayments"
          element={
            <ProtectedRoute>
              <SendPayments />
            </ProtectedRoute>
          }
        />

         <Route
          path="/payments/history"
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

          <Route
          path="/payments/approval"
          element={
            <ProtectedRoute>
              <Approval />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add-requirement"
          element={
            <ProtectedRoute>
              <AddRequirement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/requirement-enquiry"
          element={
            <ProtectedRoute>
              <RequirementEnquiry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/requirement-discussion"
          element={
            <ProtectedRoute>
              <RequirementDiscussion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/requirement-approval"
          element={
            <ProtectedRoute>
              <RequirementApproval />
            </ProtectedRoute>
          }
        />

         <Route
          path="/products/requirement-estimation"
          element={
            <ProtectedRoute>
              <Estimation />
            </ProtectedRoute>
          }
        />

      

        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/entry"
          element={
            <ProtectedRoute>
              <StaffEntry />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/list"
          element={
            <ProtectedRoute>
              <ShowStaffDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </HashRouter>

  );
}



export default App;