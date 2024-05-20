import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { fetchPizzasByIds } from "../screens/Home/services/actions";

export default class OrderStore {
  @observable orders = [];
  @observable products = [];

  constructor() {
    makeObservable(this);
  }

  getQuantity = (orderId) => {
    const order = this.orders.find((o) => o.id === orderId);
    return order ? order.quantity : 0;
  }

  fetchPizzasByIds = async () => {
    const products = await fetchPizzasByIds(this.orders.map((o) => o.id));

    runInAction(() => {
      this.products = products;
    });
  }

  @computed get totalPrice() {
    const totalPrice = this.orderedProducts.reduce((total, item) => {
      const order = this.orders.find(order => order.id === item.id);
      return total + item.price * order.quantity;
    }, 0);

    return totalPrice;
  }

  @computed get orderedProducts() {
    return this.products ? this.products.filter((p) => this.orders.find((o) => o.id === p.id)) : [];
  }

  @action addOrder(orderId) {
    const existingOrder = this.orders.find((o) => o.id === orderId);

    if (!existingOrder) {
      this.orders.push({ id: orderId, quantity: 1 });
    } else {
      this.orders = this.orders.map(accItem => accItem.id === orderId ? { ...accItem, quantity: accItem.quantity + 1 } : accItem);
    }
  }

  @action removeOrder = (id) => {
    this.orders = this.orders.filter((o) => o.id !== id);
  }

  @action clearOrders = () => {
    this.orders = [];
  }

  @action decrementQuantity = (orderId) => {
    const order = this.orders.find(item => item.id === orderId);
    if (order.quantity === 1) {
      this.orders = this.orders.filter(item => item.id !== orderId);
    } else {
      this.orders = this.orders.map(accItem => accItem.id === orderId ? { ...accItem, quantity: order.quantity - 1 } : accItem);
    }
  };

  @action incrementQuantity = (orderId) => {
    this.orders = this.orders.map(accItem => accItem.id === orderId ? { ...accItem, quantity: accItem.quantity + 1 } : accItem);
  };
}