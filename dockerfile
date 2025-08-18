FROM mcr.microsoft.com/playwright:v1.47.2-jammy

WORKDIR /app
 
COPY package*.json ./
 
RUN npm ci
 
COPY . .

RUN npx playwright install --with-deps
 
CMD ["npx", "playwright", "test", "--reporter=html"]
