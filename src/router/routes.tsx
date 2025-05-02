import { FaHome, FaShoppingCart } from "react-icons/fa";

import { IoGrid } from "react-icons/io5";

import { FaBoxOpen } from "react-icons/fa";

import Home from "../pages/Home.tsx";
import StoragePage from "../pages/StoragePage.tsx";
import OrderPage from "../pages/OrderPage.tsx";
import ProductsPage from "../pages/ProductsPage.tsx";
import { JSX } from "react";

export interface ProtectedRouteItem {
  path: string;
  namePage: string;
  element: JSX.Element;
  icon: JSX.Element;
}

export const protectedRoutes: ProtectedRouteItem[] = [
  {
    path: "/",
    namePage: "Dashboard",
    element: <Home />,
    icon: <FaHome className="mr-2" />,
  },
  {
    path: "/storage",
    namePage: "Almacén",
    element: <StoragePage />,
    icon: <FaBoxOpen className="mr-2" />,
  },
  {
    path: "/order",
    namePage: "Pedidos",
    element: <OrderPage />,
    icon: <FaShoppingCart className="mr-2" />,
  },
  {
    path: "/products",
    namePage: "Productos",
    element: <ProductsPage />,
    icon: <IoGrid className="mr-2" />,
  },
];
