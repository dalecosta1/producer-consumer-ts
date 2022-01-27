# Producer-Consumer-ts kafka

This is an example of a distibuted system using a producer and cosumer services with kafka message broker. All the code is developed using typescript.

## Installation

1 go in docker-kafka folder and start kafka

```bash
docker-compose up
```

2 When kafka is up, checking at the address http://localhost:8080 if the UI of kafka is loaded. If loaded, the message broker is on. Susbequently go in service-producer-ts and start the producer:
```bash
npm install
```
```bash
npm run build-ts && node ./dist/index.js
```
3 When producer is up, go in the service-consumer-ts to start consumer.
```bash
npm install
```
```bash
npm run build-ts && node ./dist/index.js
```

## Usage
Now after that all the services are started, send a request to the webook producer using the following address: http://localhost:5000/partium/echoservice. Remember to update the URL of mongo db in service-consumer-ts/src/index.ts with your url of mongo db.

Set as authentication basic auth, with following credentials:

username: test

password: test

Subsequently, put some information inside body (fields of the body are free to change on the based of your needs. Remember only to update the model of db data in service-consumer-ts/src/models/data.model.ts):

```bash
example:

{
  "field1": "test",
  "field2": 1,
  "field3": true
}
```

## Docker
You can use also the image of the docker instead of use 
the code.

## Usage Docker Producer
After kafka is running execute the docker
```bash
cd service-producer-ts 
docker build -t [NAME] .
docker run (-d) [NAME]
```

## Usage Docker Consumer
After kafka is running execute the docker
```bash
cd service-consumer-ts 
docker build -t [NAME] .
docker run (-d) [NAME]
```

## Pipeline CI/CD
Using circleCI, it is implemented the deploy on docker hub of 
the images of consumer and producer. If push on main, will start a pipeline
which create a new docker image and then push it to the docker hub.
If you want, you can change also the tag with specific version, and the docker image will be availabe on the docker hub. 

## Features developed
✅ Docker-compose kafka

✅ Code of distributed services: Consumer & Producer

✅ Dockerfile of Consumer and Producer services

✅ Connection with DB when consumer read data from kafka topic

✅ Docker hub images

✅ Pipeline CI/CD

## Contributing
@dalecosta1

## License
[MIT](https://choosealicense.com/licenses/mit/)