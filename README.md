zenhack
=======

zenhack 2014

## how to build

### arduino/

you need arduino and write configure based on [ecto/duino](https://github.com/ecto/duino)

and connect button to pin D2

```shell
cd arduino/
npm install
node arduino_server
```

### golang/

```shell
cd golang/
go get github.com/garyburd/redigo/redis
go run main.go
```

### socket-server/

```
cd socket-server
npm install
npm start
```

### zen/

is a markup for socket-server/
