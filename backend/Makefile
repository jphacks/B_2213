DOCKER=docker compose

run:
	$(DOCKER) down --remove-orphans
	$(DOCKER) up --build -d
down:
	$(DOCKER) down --remove-orphans

dev-run:
	$(DOCKER) down --remove-orphans
	$(DOCKER) -f ./compose.dev.yml up -d