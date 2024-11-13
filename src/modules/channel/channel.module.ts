import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CHANNEL_COMMAND_HANDLERS } from './commands/handlers';
import { ChannelController } from './channel.controller';

@Module({
  imports: [CqrsModule],
  providers: [
    ...CHANNEL_COMMAND_HANDLERS,
  ],
  controllers: [ChannelController],
})
export class ChannelModule {}
