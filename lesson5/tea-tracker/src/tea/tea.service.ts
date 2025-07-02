import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeaService {
  private teas: any[] = [];

  async findAll(minRating?: number, page = 1, pageSize = 10) {
    const filtered = minRating ? this.teas.filter(t => t.rating >= minRating) : this.teas;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    return {
      data: paginated,
      total: filtered.length,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const tea = this.teas.find(t => t.id === id);
    if (!tea) throw new NotFoundException();
    return tea;
  }

  async create(data: any) {
    const newTea = { ...data, id: uuid() };
    this.teas.push(newTea);
    return newTea;
  }

  async update(id: string, data: any) {
    const index = this.teas.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException();
    this.teas[index] = { ...this.teas[index], ...data };
    return this.teas[index];
  }

  async remove(id: string) {
    const index = this.teas.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException();
    this.teas.splice(index, 1);
  }
}
