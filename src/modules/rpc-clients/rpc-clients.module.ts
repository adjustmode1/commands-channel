import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {resolveGrpcClientOptions} from "../../utils/resolve-grpc-client-options";
import {RpcChannelRepoClient} from "./internal-channel.client";

@Global()
@Module({
  imports: [ClientsModule.register(resolveGrpcClientOptions())],
  controllers: [],
  providers: [
    RpcChannelRepoClient,
  ],
  exports: [
    RpcChannelRepoClient,
  ],
})
export class RpcClientsModule {}
