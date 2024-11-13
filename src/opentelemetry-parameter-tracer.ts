import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { SpanStatusCode } from '@opentelemetry/api/build/src/trace/status';
import { Tracer } from '@opentelemetry/sdk-trace-base';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class OpentelemetryParameterTracer implements NestInterceptor {
  constructor(private readonly tracer: Tracer) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToRpc();
    const span = this.tracer.startSpan('DEBUG');

    return next.handle().pipe(
      tap((response: Record<string, unknown>) => {
        span.setAttributes({ ...request.getData() });

        try {
          if (!response.ok) {
            span.setStatus({
              code: SpanStatusCode.ERROR,
            });

            span.addEvent('Parameter', {
              payload: JSON.stringify(request.getData()),
            });

            span.addEvent('Error', {
              error: JSON.stringify((response.error as Error).message),
            });

            span.addEvent('Response', { response: JSON.stringify(response) });
          }
        } catch (e) {
          Logger.warn(`.OpentelemetryParameterTracer`, e);
        }

        span.end();
      }),
    );
  }
}
