This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is Chati app bot, a simple chat app that uses Next.js, prisma, postgresql, and Tailwind CSS.

## Getting Started
We need to setup the .env file and .env.local file you can check the .example

First you need docker to be installed and running then you can run the following command to start the database:

```bash
docker-compose up -d
```

Then you need to install the dependencies:

```bash
npm i 

```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important
For the login/sign-up stuff I'm using a service [CLERK](https://clerk.com/)