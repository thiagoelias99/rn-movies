import { Injectable, Logger } from '@nestjs/common'
import { UsersService } from "./users/users.service"
import { getRandomUserData } from "./users/mocks/users.mocks"

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)
  constructor(private readonly usersService: UsersService) {

    this.seed()
      .then(() => {
        this.logger.debug("Database seeded successfully")
      })
      .catch((error) => {
        this.logger.error("Error seeding database", error)
      })
  }

  async seed() {
    // await this.seedUsers({ count: 50 })
  }

  async seedUsers({ count = 10 }: { count?: number } = {}) {
    for (let i = 0; i < count; i++) {
      await this.usersService.create(getRandomUserData())
    }
    this.logger.debug(`Seeded ${count} users`)
  }
}
