import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async message(
    messageWhereUniqueInput: Prisma.MessageWhereUniqueInput,
  ): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: messageWhereUniqueInput,
    });
  }

  async messages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput;
  }): Promise<Message[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.message.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getMessages(params: {fromUserId: number, userId: number}): Promise<Message[]> {
    console.log("get message service backend")
    return await this.prisma.message.findMany({
      where: {
        fromUserId: params.fromUserId,
        userId: params.userId,
      }
    })
  }

  async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    console.log("create message service backend");
    return await this.prisma.message.create({
      data,
    });
  }

  // const Message = await prisma.message.create({
  //   *   data: {
  //   *     // ... data to create a Message
  //   *   }
  //   * })

  async updateMessage(params: {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.MessageUpdateInput;
  }): Promise<Message> {
    const { where, data } = params;
    return this.prisma.message.update({
      data,
      where,
    });
  }

  async deleteMessage(where: Prisma.MessageWhereUniqueInput): Promise<Message> {
    return this.prisma.message.delete({
      where,
    });
  }

}
