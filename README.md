## Setup Development
1. Change docker compose file as required (port, db, etc)
2. Create and run docker container with `docker compose up -d`
3. Access app terminal with `docker-compose exec app sh`
4. Run `npm install` to add dependencies
5. Run `npx prisma migrate dev` to apply Prisma database migration
6. Adjust Prisma configuration in `.env` and `schema.prisma` may be required
7. Run `npm run dev` to start local development server
