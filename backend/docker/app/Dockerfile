FROM golang:1.18-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download && go mod tidy
RUN go build -o main /app/main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
CMD ["./main"]