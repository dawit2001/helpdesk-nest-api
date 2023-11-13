import { Injectable } from '@nestjs/common';
import { Attachement, Prisma, Tickets } from '@prisma/client';
import { off } from 'process';
import { promises } from 'readline';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllTickets(): Promise<Tickets[] | null> {
    return await this.prisma.tickets.findMany({
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }
  async getTicket(Id: string): Promise<Tickets | null> {
    return await this.prisma.tickets.findUnique({
      where: {
        Id,
      },
    });
  }
  async getUserTickets(
    Id: string,
    offset: number,
    limit: number,
  ): Promise<{ Tickets: Tickets[]; count: number } | null> {
    const Tickets = await this.prisma.tickets.findMany({
      where: {
        UserId: Id,
      },
      skip: offset,
      take: limit,
      orderBy: {
        CreatedAt: 'desc',
      },
    });
    const count = await this.prisma.tickets.count({
      where: {
        UserId: Id,
      },
    });
    if (!Tickets && count === 0) {
      return null;
    }
    return { Tickets, count };
  }
  async newTicket(data: Prisma.TicketsCreateInput): Promise<Tickets> {
    const Ticket = await this.prisma.tickets.create({
      data,
    });
    return Ticket;
  }
  async newEmailTicket(data: Prisma.TicketsCreateInput): Promise<Tickets> {
    console.log(data);
    return;
  }
  async fetchSingleAttachment(Id: string): Promise<Attachement[] | null> {
    return await this.prisma.attachement.findMany({
      where: {
        TicketId: Id,
      },
    });
  }
  async fetchAttachment(): Promise<Attachement[]> {
    const Attachement = await this.prisma.attachement.findMany();
    return Attachement;
  }
  async newAttachment(
    data: Prisma.AttachementCreateInput,
  ): Promise<Attachement> {
    console.log(data);
    const Attachment = await this.prisma.attachement.create({
      data,
    });
    return Attachment;
  }
  async updateTicket(Id: string, data: Prisma.TicketsUpdateInput) {
    const Ticket = await this.prisma.tickets.update({
      where: {
        Id,
      },
      data,
    });
    return Ticket;
  }
  async deleteTicket(Id: string): Promise<Tickets> {
    const attachment = await this.prisma.attachement.deleteMany({
      where: {
        TicketId: Id,
      },
    });
    const ticket = await this.prisma.tickets.delete({
      where: {
        Id,
      },
    });
    return ticket;
  }
  async deleteAttachment(Id: string): Promise<Attachement> {
    const attachement = await this.prisma.attachement.delete({
      where: { Id },
    });
    return attachement;
  }
}
