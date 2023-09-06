import { create } from 'zustand';

const initial = {
  order: null,
};

export const useCashierStore = create((set, get) => ({
  ...initial,
  products: () => {
    const store = get();

    const obj = {};

    for (const product of store.order.products) {
      const value = obj[product.id];

      if (!value) {
        obj[product.id] = { count: 1, product };
      } else {
        obj[product.id] = { ...value, count: value.count + 1 };
      }
    }

    return Object.values(obj);
  },
  sum: () => {
    const store = get();
    let sum = 0;

    for (const product of store.order.products) {
      sum += product.cost;
    }

    return sum;
  },
  setOrder: (order) => set((state) => ({ ...state, order })),
  addProduct: (product) => {
    set((state) => ({
      ...state,
      order: { ...state.order, products: state.order.products.concat(product) },
    }));
  },
  removeProduct: (data, count = 1) => {
    set((state) => {
      let removed = 0;
      const products = [];

      for (const product of state.order.products) {
        if (product.id === data.id) {
          if (removed !== count) {
            removed += 1;
          } else {
            products.push(product);
          }
        } else {
          products.push(product);
        }
      }

      return {
        ...state,
        order: {
          ...state.order,
          products,
        },
      };
    });
  },
}));

export const subscribeCashier = useCashierStore.subscribe;

export const getCashierStore = () => useCashierStore.getState();
