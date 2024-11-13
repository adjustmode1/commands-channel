import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateDataChannelCommand } from '../impl';
import {RpcChannelRepoClient} from "../../../rpc-clients/internal-channel.client";
import {ulid} from "ulid";

@CommandHandler(CreateDataChannelCommand)
export class CreateDataChannelHandler
  implements ICommandHandler<CreateDataChannelCommand>
{
  private readonly logger = new Logger(CreateDataChannelHandler.name);

  constructor(
    private readonly channelInternal: RpcChannelRepoClient
  ) {}

  async execute({
    workspaceId,
    name
  }: CreateDataChannelCommand): Promise<
    string | Error
  > {
    this.logger.verbose('.execute', {
      workspaceId,
      name,
    });

    return this.channelInternal.CreateDataChannel({
      workspaceId,
      channelId: ulid(),
      name
    })
  }
}
