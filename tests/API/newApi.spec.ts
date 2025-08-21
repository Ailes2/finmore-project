import { expect, test, APIRequestContext } from '@playwright/test';

test.describe('Check api', () => {
  const myHeader = {
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW46RW5naW5lZXJfMTIz',
  };

  async function apiRequestGet(
    request: APIRequestContext,
    url: string,
    statusCode: number,
    headers?: Record<string, string>,
  ) {
    const response = await request.get(url, { headers });
    await expect(response.status()).toBe(statusCode);
    return await response.json();
  }

  test('Get data about specific post without token', async ({ request }) => {
    const dataResponse = await apiRequestGet(
      request,
      'https://dev.emeli.in.ua/wp-json/wp/v2/posts/19541',
      200,
    );
    console.log('Post id = ' + dataResponse.id);
  });

  test('Create new post, check and delete', async ({ request }) => {
    let dataTestId: number;

    await test.step('Create new post', async () => {
      const response = await request.post('https://dev.emeli.in.ua/wp-json/wp/v2/posts', {
        data: {
          title: 'New title for test',
          content: 'New content for test',
        },
        headers: myHeader,
      });

      await expect(response.status()).toBe(201);
      const data = await response.json();
      dataTestId = data.id;

      console.log(
        `Created post id=${dataTestId}, title=${data.title.rendered}, content=${data.content.rendered}`,
      );
    });

    await test.step('Get data about created post', async () => {
      const dataResponse = await apiRequestGet(
        request,
        `https://dev.emeli.in.ua/wp-json/wp/v2/posts/${dataTestId}`,
        200,
        myHeader,
      );
      console.log(`Found post id=${dataResponse.id}, title=${dataResponse.title.rendered}`);
    });

    await test.step('Delete created post', async () => {
      const responseDelete = await request.delete(
        `https://dev.emeli.in.ua/wp-json/wp/v2/posts/${dataTestId}`,
        { headers: myHeader },
      );
      await expect(responseDelete.status()).toBe(200);
      const dataOfResponse = await responseDelete.json();
      console.log('Deleted post id=' + dataOfResponse.id);
    });
  });
});

// summery:
// Creating post using valid requred field

// Precondition:
// POST /wp/v2/posts
// User is logged

// STP:
// {
//     "title": string,
//     "content": string
// }

// AR:
// status code is 201
// BD: ...

//https://dev.emeli.in.ua/21221-2
