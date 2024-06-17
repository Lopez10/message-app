docker-dev-up:
	@echo "Up docker-compose in dev"
	docker-compose -f ./docker-compose.dev.yml up

docker-dev-down:
	@echo "Down docker-compose"
	docker-compose -f ./docker-compose.dev.yml down