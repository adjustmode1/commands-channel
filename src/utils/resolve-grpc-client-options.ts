import { loadConfiguration } from '@halomeapis/nestjs-common-modules';
import { ConfigService } from '@nestjs/config';
import { ClientsModuleOptions, GrpcOptions } from '@nestjs/microservices';
import { dirname } from 'path';

export function resolveGrpcClientOptions(
  services?: string[],
): ClientsModuleOptions {
  const config = new ConfigService(loadConfiguration());
  let expected =
    config.getOrThrow<Array<GrpcOptions & { name: string }>>('grpcClients');

  if (services) {
    expected = expected.filter((opts) => {
      return services.includes(opts.name);
    });
  }

  return expected.map((opts) => ({
    ...opts,
    options: {
      ...opts.options,
      protoPath: Array.isArray(opts.options.protoPath)
        ? opts.options.protoPath.map((path) => require.resolve(path))
        : require.resolve(opts.options.protoPath),
      loader: {
        includeDirs: [
          dirname(require.resolve('google-proto-files/package.json')),
          dirname(
            require.resolve('@adjustmode1/internal-channel/package.json'),
          ),
        ],
      },
    },
  }));
}
