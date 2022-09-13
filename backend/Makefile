DOCKER=docker compose

run:
	$(DOCKER) up --build -d
down:
	$(DOCKER) down

dev-run:
	$(DOCKER) down
	$(DOCKER) -f ./compose.dev.yml up --build -d