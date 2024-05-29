import OrderStore from "./OrderStore";
import ProductsStore from "./ProductsStore";

export default function RootStore() {
  return {
    orderStore: new OrderStore(),
    productsStore: new ProductsStore(),
  }
}