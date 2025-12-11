import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumberString, IsOptional } from "class-validator"

export class QueryUserDto {
  @ApiPropertyOptional({ description: "Page number for pagination", example: 1 })
  @IsNumberString()
  @IsOptional()
  page?: number

  @ApiPropertyOptional({ description: "Number of items per page for pagination", example: 8 })
  @IsNumberString()
  @IsOptional()
  limit?: number
}