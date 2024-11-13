import { loadConfiguration } from '@halomeapis/nestjs-common-modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';


import { ChannelModule } from "./modules/channel/channel.module";
import {RpcClientsModule} from "./modules/rpc-clients/rpc-clients.module";

@Module({
  imports: [
    CqrsModule,
    ChannelModule,
    RpcClientsModule,
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [],
})
export class GrpcModule {}
