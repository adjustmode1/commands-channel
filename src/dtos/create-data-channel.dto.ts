import {
  CreateChannelRequest,
} from '@adjustmode1/proto-files-channel';

import {
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateDataChannelDto implements CreateChannelRequest {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  workspaceId!: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name!: string;
}
