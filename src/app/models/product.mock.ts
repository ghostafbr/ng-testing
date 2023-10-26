
import { faker } from '@faker-js/faker';
import {Product} from "./product.model";

export const generateOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: {
      id: parseFloat(faker.string.uuid()),
      name: faker.commerce.department(),
    },
    images: [faker.image.url(), faker.image.url()],
  }
}
export const generateManyProducts = (count: number = 10): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateOneProduct());
  }
  return [...products];
}
