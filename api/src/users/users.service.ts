import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { randomUUID } from 'crypto'
import { User } from "./entities/user.entity"
import { QueryUserDto } from "./dto/query-user.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }


  async findAll(query?: QueryUserDto): Promise<User[]> {
    const page = query?.page ? Number(query.page) : 1
    const limit = query?.limit ? Number(query.limit) : 8
    const skip = (page - 1) * limit

    const [data, total] = await this.userRepo.findAndCount({
      relations: ['sessions', 'accounts'],
      skip,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    })

    return data
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['sessions', 'accounts'],
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async create(data: CreateUserDto) {
    const user = this.userRepo.create({
      id: randomUUID(),
      ...data
    })
    return this.userRepo.save(user)
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id)

    Object.assign(user, data)

    return this.userRepo.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepo.remove(user)
    return { deleted: true }
  }
}
