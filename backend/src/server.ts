// backend/src/server.ts
import { createApp } from './app';

async function startDev() {
  const app = await createApp();
  await app.listen(3001);
  console.log(`🚀 Dev server running on http://localhost:3001`);
}

startDev();
