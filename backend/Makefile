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

test:
	go test -v -coverprofile=cover_file.out  ./...
	go tool cover -html=cover_file.out -o cover_file.html
	open cover_file.html
	sleep 3
	rm cover_file.out cover_file.html

lint-fmt-test:
	golangci-lint run
	go fmt ./...
	make test