import { getWorkplaceStore } from 'src/stores/workplace.store';
import { getAuthStore } from 'src/stores/auth.store';

export function createBaseOrderFeature(products = []) {
  const authStore = getAuthStore();
  const workplaceStore = getWorkplaceStore();

  workplaceStore.setOrder({
    status: 'new',
    employee: authStore.user.id,
    products,
    created: new Date().getTime(),
  });
}

export function addProductsToOrderFeature(product) {
  const workplaceStore = getWorkplaceStore();

  if (workplaceStore.order) {
    workplaceStore.addProduct(product);
  }

  if (!workplaceStore.order) {
    createBaseOrderFeature([product]);
  }
}
