import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from './env.validation';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { CustomersModule } from './customers/customers.module';
;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validate }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        uri: cfg.get<string>('DB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    RoomsModule,
    BookingsModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
