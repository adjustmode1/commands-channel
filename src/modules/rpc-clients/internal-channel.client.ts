import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { InternalChannelInterface } from '@adjustmode1/internal-channel/src/interface/internal-channel.interface';
import { CreateDataChannelRequest } from '@adjustmode1/internal-channel/src/typings';

@Injectable()
export class RpcChannelRepoClient implements OnModuleInit {
  private readonly logger = new Logger(RpcChannelRepoClient.name);
  private repo!: InternalChannelInterface;

  constructor(@Inject('CHANNEL_REPO') private client: ClientGrpc) {}

  onModuleInit(): void {
    this.repo = this.client.getService<InternalChannelInterface>(
      'InternalDataChannelService',
    );
  }

  async CreateDataChannel(
    data: CreateDataChannelRequest,
  ): Promise<string | Error> {
    try {
      const result = await firstValueFrom(
        this.repo.CreateDataChannel({ ...data }),
      );

      if (result.error) {
        this.logger.error('[INTERNAL] .CreateDataChannel', {
          reason: '',
        });
        return new Error('error');
      }

      return result.data as string;
    } catch (error) {
      this.logger.error('[EXCEPTION] .CreateDataChannel', {
        reason: error,
      });

      return new Error((error as Error).message);
    }
  }
}
