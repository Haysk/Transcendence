#!/bin/sh
npm install
npx prisma generate
npx prisma db push
if [ -d "/usr/src/app/prisma/migrations" ]
then
    npx prisma migrate dev
else
    npx prisma migrate deploy
fi
npm run start:dev
