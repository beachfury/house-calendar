// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import dashboardLayoutsApi from '@/routes/dashboardLayouts';
import { AppModule } from './app.module';

export async function createApp() {
  const server = express();
  server.use(cors());
  server.use(bodyParser.json());

  // mount your plain-Express dashboard layouts route
  server.use('/api/dashboard-layouts', dashboardLayoutsApi);

  // Hand this same server to Nest so it adds /api/widget-settings, /api/users, etc.
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.setGlobalPrefix('api');
  return app;
}
