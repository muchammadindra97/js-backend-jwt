## About
Backend http server authentication and authorization using JWT simple implementation using node, express, and postgres.

## Setup Development
1. Copy `.env.dev` to `.env` and set key-value as needed
2. Copy `composer.yaml.dev` to `composer.yaml` and adjust it's value as required (port, db, etc)
3. Create and run docker container with `docker compose up -d`
4. Access app terminal with `docker-compose exec app sh`
5. Run `npm install` to add dependencies
6. Run `npx prisma migrate dev` to apply Prisma database migration
7. Adjust Prisma configuration in `.env` and `schema.prisma` may be required
8. Run `npm run dev` to start local development server
