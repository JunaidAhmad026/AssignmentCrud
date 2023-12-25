import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { CustomersService, } from './customers.service';
import { customersSchema } from './schema/customers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'customers', schema: customersSchema }])
  ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
