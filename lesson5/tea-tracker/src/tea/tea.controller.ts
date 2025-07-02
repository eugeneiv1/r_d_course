import { Controller, Get, Post, Put, Delete, Param, Query, UseInterceptors } from '@nestjs/common';
import { TeaService } from './tea.service';
import { ZBody } from '../common/z-body.decorator';
import { CreateTeaDto, UpdateTeaDto } from './tea.schema';
import { RateLimit } from 'nestjs-rate-limiter';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Public } from '../common/public.decorator';
import { ResponseTimeInterceptor } from '../common/response-time.interceptor';

@ApiTags('Tea')
@UseInterceptors(ResponseTimeInterceptor)
@Controller('tea')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Public()
  @Get()
  @ApiQuery({ name: 'minRating', required: false })
  async getAll(@Query('minRating') minRating: number, @Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.teaService.findAll(minRating, page, pageSize);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.teaService.findOne(id);
  }

  @Post()
  @RateLimit({ points: 10, duration: 60 })
  async create(@ZBody(CreateTeaDto) body: any) {
    return this.teaService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @ZBody(UpdateTeaDto) body: any) {
    return this.teaService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teaService.remove(id);
  }
}
