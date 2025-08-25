import { test, expect } from '@playwright/test';
import { ApiRequests } from '../../pages/ApiRequests';

test.describe('Blog posts API', () => {
  test('Get data about specific post without token', async ({ request }) => {
    const api = new ApiRequests(request);

    const dataResponse = await api.getPost(19541, false);
    console.log(`Post id = ${dataResponse.id}`);
    expect(dataResponse.id).toBe(19541);
  });

  test('Create, read and delete post', async ({ request }) => {
    const api = new ApiRequests(request);
    let dataTestId: number;

    await test.step('Create new post', async () => {
      const data = await api.createPost({
        title: 'New title for test',
        content: 'New content for test',
      });
      dataTestId = data.id;

      console.log(
        `Created post id=${dataTestId}, title=${data.title.rendered}, content=${data.content.rendered}`,
      );
      expect(data.title.rendered).toContain('New title for test');
    });

    await test.step('Get data about created post', async () => {
      const dataResponse = await api.getPost(dataTestId, true);

      console.log(`Found post id=${dataResponse.id}, title=${dataResponse.title.rendered}`);
      expect(dataResponse.id).toBe(dataTestId);
    });

    await test.step('Delete created post', async () => {
      const status = await api.deletePost(dataTestId, true);
      expect(status).toBe(200);
    });
  });
});
