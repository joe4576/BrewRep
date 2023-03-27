up:
	docker-compose -f ./server/docker-compose-db-only.yml up --detach

down:
	docker-compose -f ./server/docker-compose-db-only.yml down 

# Drops data, create new db, apply migrations, seed db
refreshdb:
	cd server && \
	npx prisma migrate reset
	