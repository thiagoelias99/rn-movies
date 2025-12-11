import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { ApiKey } from '../auth/api-key.decorator'
import { ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Movie } from './entities/movie.entity'
import { UpdateSearchCountDto } from "./dto/update-search-count.dto"

// @ApiKey()
@ApiTags('Movies')
// @ApiHeader({ name: 'x-api-key', description: 'API key for authentication' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post('search')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Movie search count updated successfully.', type: Movie })
  async updateSearchCount(@Body() dto: UpdateSearchCountDto) {
    return this.moviesService.updateSearchCount(dto)
  }

  @Get('popular')
  @ApiOkResponse({ description: 'Returns a list of popular movies.', type: [Movie] })
  async getPopularMovies(): Promise<Movie[]> {
    return this.moviesService.getPopularMovies()
  }
}
