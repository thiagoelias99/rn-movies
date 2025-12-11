import { faker } from '@faker-js/faker'
import { CreateUserDto } from "../dto/create-user.dto"
import { capitalizeName } from "../../utils"

export function getRandomUserData(data?: Partial<CreateUserDto>): CreateUserDto {
  return {
    name: data?.name || capitalizeName(faker.person.fullName()),
    email: data?.email || faker.internet.email(),
    image: data?.image || faker.image.avatar(),
  }
}