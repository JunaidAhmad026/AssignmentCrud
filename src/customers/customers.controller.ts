import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
    @ApiOperation({
    summary: 'Create a customer.',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
    @ApiOperation({
    summary: 'Get all the customers.',
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
    @ApiOperation({
    summary: 'Get a apecific customer using customer id.',
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
    @ApiOperation({
    summary: 'Updated a specific customer using customer id and updated fields.',
  })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
    @ApiOperation({
    summary: 'Delete a customer using its customer id.',
  })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
