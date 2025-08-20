import { test } from '@playwright/test';
import { request } from 'http';

test('Api', async ({ request }) => {
  const response = await request.post(
    'https://wfeyphieqwpnkkqgyvci.supabase.co/rest/v1/transactions?select=*&order=created_at.desc',
  );
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
