DOCKER=docker compose

run:
	make down
	$(DOCKER) up --build -d
down:
	$(DOCKER) down

dev-run:
	make dev-down
	$(DOCKER) -f ./compose.dev.yml up -d

dev-down:
	$(DOCKER) -f ./compose.dev.yml down