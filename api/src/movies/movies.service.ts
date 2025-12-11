import { Injectable } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { InjectRepository } from "@nestjs/typeorm"
import { Movie } from "./entities/movie.entity"
import { Repository } from "typeorm"
import { UpdateSearchCountDto } from "./dto/update-search-count.dto"
import { randomUUID } from "crypto"

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) { }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie'
  }

  findAll() {
    return `This action returns all movies`
  }

  async getPopularMovies(): Promise<Movie[]> {
    return this.movieRepo.find({
      order: {
        count: 'DESC',
      },
      take: 10,
    })
  }

  async updateSearchCount(dto: UpdateSearchCountDto): Promise<Movie[]> {
    console.log('Updating search count for term:', dto)

    const [result, count] = await this.movieRepo
      .findAndCount({ where: { searchTerm: dto.searchTerm } })

    console.log('Found movie:', result)

    if (count > 0) {
      const existingMovie = result[0]

      await this.movieRepo.update(existingMovie.id, { count: existingMovie.count + 1 })

      const updatedMovie = await this.movieRepo.findOneBy({ id: existingMovie.id })

      if (updatedMovie) {
        return [updatedMovie]
      } else {
        throw new Error('Failed to retrieve updated movie')
      }
    } else {
      const newMovie = this.movieRepo.create({
        id: randomUUID(),
        searchTerm: dto.searchTerm,
        movieId: dto.movieId,
        count: 1,
        posterUrl: dto.posterUrl,
        title: dto.title,
      })

      await this.movieRepo.save(newMovie)

      return [newMovie]
    }
  }
}
