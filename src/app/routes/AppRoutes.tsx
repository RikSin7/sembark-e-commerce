import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import ProductListPage from "../../features/products/pages/ProductListPage"
import ProductDetailsPage from "../../features/products/pages/ProductDetailsPage"
import CartPage from "../../features/cart/pages/CartPage"

function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ProductListPage />
        },
        {
          path: "/product/:id",
          element: <ProductDetailsPage />
        },
        {
          path: "/cart",
          element: <CartPage />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={routes} />
  )
}

export default AppRoutes