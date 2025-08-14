import { test, expect } from '@playwright/test';

test('Create new product', async ({ request }) => {
  const responsePost = await request.post('https://fakestoreapi.com/products', {
    data: {
      title: 'My Aliser product',
      price: 1000,
      description: 'new product for testing api',
    },
  });

  await expect(responsePost.status()).toBe(201);

  const dataPost = await responsePost.json();
  console.log(dataPost);

  ////////////////////////////////

  const response = await request.get('https://fakestoreapi.com/products/21');

  await expect(response.status()).toBe(200);

  const text = await response.text();
  if (text) {
    const data = JSON.parse(text);
    console.log(data);
  } else {
    console.log('Пуста відповідь');
  }
});
