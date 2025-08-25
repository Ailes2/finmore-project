import { APIRequestContext, APIResponse, expect } from '@playwright/test';

interface PostData {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: string;
  categories?: number[];
  tags?: number[];
  slug?: string;
  [key: string]: unknown;
}

export class ApiRequests {
  private request: APIRequestContext;
  private readonly baseUrl = 'https://dev.emeli.in.ua/wp-json/wp/v2/posts';
  private readonly headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW46RW5naW5lZXJfMTIz',
  };

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private async validateResponse(response: APIResponse, expectedStatus: number) {
    const actualStatus = response.status();
    const text = await response.text();
    expect(actualStatus, `Unexpected status. Body: ${text}`).toBe(expectedStatus);
    return JSON.parse(text);
  }

  async getPost(id: number, withAuth = false) {
    const response = await this.request.get(`${this.baseUrl}/${id}`, {
      headers: withAuth ? this.headers : undefined,
    });
    return this.validateResponse(response, 200);
  }

  async createPost(data: PostData) {
    const response = await this.request.post(this.baseUrl, {
      headers: this.headers,
      data,
    });
    return this.validateResponse(response, 201);
  }

  async updatePost(id: number, data: PostData) {
    const response = await this.request.post(`${this.baseUrl}/${id}`, {
      headers: this.headers,
      data,
    });
    return this.validateResponse(response, 200);
  }

  async deletePost(id: number, force = false) {
    const response = await this.request.delete(`${this.baseUrl}/${id}?force=${force}`, {
      headers: this.headers,
    });
    expect(response.status()).toBe(200);
    return response.status();
  }
}
