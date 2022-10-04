FROM golang:1.18-alpine
WORKDIR /go/src
RUN apk upgrade --update
RUN apk --no-cache add git
RUN go install github.com/cosmtrek/air@latest
COPY ./.air.toml .

CMD ["air", "-c", ".air.toml"]