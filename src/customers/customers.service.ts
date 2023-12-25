import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customers } from './schema/customers';

@Injectable()
export class CustomersService {
  constructor(@InjectModel('customers') private customersInfo: Model<Customers>){}


  create(createCustomerDto: CreateCustomerDto) {
    const customer = new this.customersInfo(createCustomerDto);
    return customer.save();
  }

  findAll() {
    return this.customersInfo.find();
  }

  findOne(id: string) {
    return this.customersInfo.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customersInfo.findByIdAndUpdate(id, updateCustomerDto, {new: true});
  }

  remove(id: string) {
    return this.customersInfo.deleteOne({_id:id})
  }
}
