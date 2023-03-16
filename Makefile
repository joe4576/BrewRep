up:
	docker-compose -f ./server/docker-compose-db-only.yml up --detach

down:
	docker-compose -f ./server/docker-compose-db-only.yml down 