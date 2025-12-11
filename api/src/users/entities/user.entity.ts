import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from "@nestjs/swagger"


@Entity('user')
export class User {
  @PrimaryColumn()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier for the user' })
  id: string

  @Column()
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  name: string

  @Column({ unique: true })
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
  email: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Timestamp when the user was created' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  @ApiProperty({ example: '2024-01-02T00:00:00Z', description: 'Timestamp when the user was last updated' })
  updatedAt: Date
}
