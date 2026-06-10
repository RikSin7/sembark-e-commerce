import AppRoutes from "./app/routes/AppRoutes"
import { CartProvider } from "./features/cart/context/CartContext"

function App() {
  return (
    <>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </>
  )
}

export default App