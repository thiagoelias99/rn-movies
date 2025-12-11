import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiKey } from "../auth/api-key.decorator"
import { ApiHeader, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { User } from "./entities/user.entity"
import { QueryUserDto } from "./dto/query-user.dto"

@ApiKey()
@ApiTags('Users')
@ApiHeader({ name: 'x-api-key', description: 'API key for authentication' })
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiInternalServerErrorResponse({ description: "Internal server error" })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOkResponse({ description: "List of users retrieved successfully.", type: [User] })
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({ description: "User retrieved successfully.", type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ description: "User created successfully.", type: User })
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({ description: "User updated successfully.", type: User })
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: "User deleted successfully." })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
