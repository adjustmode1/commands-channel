import * as process from 'process';
import { ulid } from 'ulid';

import CONFIG_INSTANCE from './utils/get-config';

export type UserId = string;

interface DbConfig {
  dbName: string;
  collectionName: string;
}

// APP CONFIG FOR TEST:E2E
export const APP_DB_TEST = ulid();
export const APP_IS_TEST = process.env.NODE_ENV === 'test';

export const MONGO_CLIENT_URL = CONFIG_INSTANCE.getOrThrow<string>(
  'store.mongo.data_user_profile.clientUrl',
);

export const DATA_USER_PROFILE_DATABASE = CONFIG_INSTANCE.getOrThrow<DbConfig>(
  'store.mongo.data_user_profile',
);

export const DATA_USER_RINGBACK_TONE_DATABASE =
  CONFIG_INSTANCE.getOrThrow<DbConfig>('store.mongo.data_user_ringback_tone');

export const DATA_USER_CONNECT_DATABASE = CONFIG_INSTANCE.getOrThrow<DbConfig>(
  'store.mongo.data_user_connect',
);

export const DATA_USER_VISITED_PROFILE_DATABASE =
  CONFIG_INSTANCE.getOrThrow<DbConfig>('store.mongo.user_visited_profile');

// LIST_DB to drop db in test:e2e
export const LIST_DB: Array<DbConfig> = [
  DATA_USER_PROFILE_DATABASE,
  DATA_USER_CONNECT_DATABASE,
  DATA_USER_RINGBACK_TONE_DATABASE,
  DATA_USER_VISITED_PROFILE_DATABASE,
];

export const GHOST_ID = CONFIG_INSTANCE.getOrThrow<string>(
  'constraint.default.ghostId',
);
