FROM golang:1.18-alpine
WORKDIR /go/src
COPY ../.. .
RUN apk upgrade --update && \
    apk --no-cache add git && \
    go get -u github.com/cosmtrek/air && \
    go build -o /go/bin/air github.com/cosmtrek/air

CMD ["air", "-c", ".air.toml"]