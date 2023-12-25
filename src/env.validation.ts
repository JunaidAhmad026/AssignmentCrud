import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  Dev = 'dev',
  Stag = 'stag',
  Prod = 'prod',
  Test = 'test',
}

export enum RoomsTypes {
  Room = 'room',
  Suite = 'suite',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  API_PREFIX: string;
}

export function validate(configuration: Record<string, unknown>) {
  const config = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
}
