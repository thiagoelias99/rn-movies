import { ApiProperty } from "@nestjs/swagger"
import { IsString } from 'class-validator'

export class UpdateSearchCountDto {
  @ApiProperty({ example: 'avengers', description: 'Search term for the movie' })
  @IsString()
  searchTerm: string

  @ApiProperty({ example: 'https://example.com/poster.jpg', description: 'URL of the movie poster' })
  @IsString()
  posterUrl: string

  @ApiProperty({ example: 'tt0848228', description: 'Unique identifier for the movie from an external database' })
  @IsString()
  movieId: string

  @ApiProperty({ example: 'The Avengers', description: 'Title of the movie' })
  @IsString()
  title: string
}
