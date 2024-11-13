# gRPC service boilerplate
NestJS &amp; GRPC microservice boilerplate

## Prerequisites
* Node 18.x
* NPM 9.x

## Get started
* Update `dev.development.yaml`
* Run `npm run start:dev`

## E2E Testing
* Update `env.test.yaml`
* Run `npm run build:proto` to regenerate protobuf types
* Run test `npm run test:e2e`

## Docker Remote Dev
```
docker build -t localhost:5000/data-repositories-user-data -f .dh-build/Dockerfile --build-arg PATOKEN="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" . && docker push localhost:5000/data-repositories-user-data
```
