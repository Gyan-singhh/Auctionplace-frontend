import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";

import {
  Home,
  Login,
  Signup,
  Contact,
  About,
  CreateProduct,
  ProductPage,
  Analytics,
  EditProduct,
  MyProducts,
  PersonalProfile,
  WinningBids,
  AllProductList,
  AllUsers,
  Commission,
  MessagesPage,
  Layout,
  AuthLayout,
  Sidebar,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "login",
            element: (
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthLayout authentication={false}>
                <Signup />
              </AuthLayout>
            ),
          },
          { path: "product/:id", element: <ProductPage /> },
          { path: "about-us", element: <About /> },
          { path: "contact", element: <Contact /> },
        ],
      },
      
      {
        path: "/user",
        element: (
          <AuthLayout authentication={true}>
            <Sidebar />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <PersonalProfile /> },
          { path: "analytics", element: <Analytics /> },
          { path: "my-products", element: <MyProducts /> },
          { path: "edit-product/:id", element: <EditProduct /> },
          { path: "create-product", element: <CreateProduct /> },
          { path: "all-users", element: <AllUsers /> },
          { path: "all-product-list", element: <AllProductList /> },
          { path: "winning-bids", element: <WinningBids /> },
          { path: "commission/:id", element: <Commission /> },
          { path: "messages", element: <MessagesPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
