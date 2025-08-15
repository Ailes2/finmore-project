import { expect, test } from '@playwright/test';

test('Get products list', async ({ request }) => {
  const response = await request.get('https://fakestoreapi.com/products');

  await expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data);
});

test('Create new product', async ({ request }) => {
  const response = await request.post('https://fakestoreapi.com/products', {
    data: {
      title: 'My Aliser product',
      price: 1000,
      description: 'new product for testing api',
    },
  });
  await expect(response.status()).toBe(201);

  const data = await response.json();
  console.log(data);
});
