#!/bin/sh
npm install &&
npx prisma migrate deploy &&
npm run start:dev
