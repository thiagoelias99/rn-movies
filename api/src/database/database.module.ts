import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          synchronize: true,
          autoLoadEntities: true,
          database: "movies.db"
        }
      },
    }),
  ],
})

export class DatabaseModule { }
