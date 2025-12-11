import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('movie')
export class Movie {
  @PrimaryColumn()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique identifier for the movie' })
  id: string

  @Column({ unique: true })
  @ApiProperty({ example: 'avengers', description: 'Search term for the movie' })
  searchTerm: string

  @Column()
  @ApiProperty({ example: 1500, description: 'Number of times the movie has been searched' })
  count: number

  @Column({ name: 'poster_url' })
  @ApiProperty({ example: 'https://example.com/poster.jpg', description: 'URL of the movie poster' })
  posterUrl: string

  @Column({ name: 'movie_id' })
  @ApiProperty({ example: 'tt0848228', description: 'Unique identifier for the movie from an external database' })
  movieId: string

  @Column()
  @ApiProperty({ example: 'The Avengers', description: 'Title of the movie' })
  title: string
}