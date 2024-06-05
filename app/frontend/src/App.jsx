import './App.css'
import React from "react";
import Home from "./views/Home";
import Login from "./components/login";
import Signup from "./components/Signup";
import CustomerList from "./components/CustomerList";
import CustomerInfo from "./components/CustomerInfo";
import CustomerForm from "./components/CustomerForm";
import EditCustomerInfo from "./components/EditCustomerInfo";
import CustomerAction from "./components/CustomerAction";
import ActionForm from "./components/ActionForm";
import EditAction from "./components/EditAction";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHome from "./views/MainHome";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/create"
            element={
              <ProtectedRoute>
                <CustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute>
                <CustomerInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/customers/edit/:id" element={<EditCustomerInfo />} />
          <Route
            path="/:id/actions/"
            element={
              <ProtectedRoute>
                <CustomerAction />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/:id/actions/create"
            element={
              <ProtectedRoute>
                <ActionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id/actions/:actionId/edit"
            element={
              <ProtectedRoute>
                <EditAction />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
