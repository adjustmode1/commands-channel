import { loadConfiguration } from '@halomeapis/nestjs-common-modules';
import { ConfigService } from '@nestjs/config';

let CONFIG_INSTANCE;

if (!CONFIG_INSTANCE) {
  CONFIG_INSTANCE = new ConfigService(loadConfiguration());
}

export default CONFIG_INSTANCE as ConfigService;
