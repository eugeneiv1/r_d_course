import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export const ZBody = (schema: ZodSchema) =>
  createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      return await schema.parseAsync(request.body);
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  })();
