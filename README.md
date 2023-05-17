<p align="center">
    <img src="./kafka.png" height="130"/>
</p>
<p align="center">
    <img src="https://img.shields.io/github/package-json/v/wellers0n/node-kafka?style=flat-square"/>
    <img src="https://img.shields.io/github/last-commit/wellers0n/node-kafka?style=flat-square"/>
    <a href="https://twitter.com/wellers0n_" target="_blank">
        <img src="https://img.shields.io/twitter/url/https/wellers0n_.svg?style=social"/>
    </a>
</p>

<p>
   <h1 align="center">node-kafka</h1>
<p/>
    
<br/>

## Nodejs and kafka

node-kafka uses a stack full `Typescript` on the backend, I'm making this project to improve
my skills!

## Node version

Use node `v18.12.1`

## Initing in the your PC

- For clone the project `git clone https://github.com/Wellers0n/node-kafka.git`
- Enter in the folder `cd node-kafka/`
- To install project dependency: `yarn`

## Init kafka and apache

At the root directory, run the following commands:

start kafka and apache

```sh
docker-compose up --build -d
```

and start server

```sh
yarn dev
```

## Listening in

PORT: `http://localhost:3001`

## API Docs

Visit [http://localhost:3001/docs/](http://localhost:3001/docs/) for more information about the documentation

## kill docker-compose

```sh
docker-compose down -v
```

## Stack used

[ReactJS](https://reactjs.org/)<br/>
[ExpressJS](https://expressjs.com/)<br/>
[MongoDB](https://www.mongodb.com/)<br/>
[Swagger](https://swagger.io/)<br/>
[Docker-compose](https://docs.docker.com/compose/)<br/>
[Yarn](https://yarnpkg.com/en/)<br/>
