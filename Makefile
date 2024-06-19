docker-dev-up:
	@echo "Up docker-compose in dev"
	docker-compose -f ./docker-compose.dev.yml up

docker-dev-down:
	@echo "Down docker-compose"
	docker-compose -f ./docker-compose.dev.yml down

docker-local-up:
	@echo "Up docker-compose in local"
	docker-compose -f ./docker-compose.local.yml up

docker-local-down:
	@echo "down docker-compose in local"
	docker-compose -f ./docker-compose.local.yml down