import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Message, Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

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

  async getMessages(params: { fromUserId: Number, userId: Number }): Promise<Message[]> {
    console.log("requete prisma : params : fromUserId : " + params.fromUserId + " | userId : " + params.userId);
    return await this.prisma.message.findMany({
      where: {
        fromUserId: { in: [Number(params.fromUserId), Number(params.userId)]},
        userId: {in: [Number(params.userId), Number(params.fromUserId)]}
      }
    });
  }

  async getChannelMessages(params: {channelName: string}): Promise<Message[]> {
    return await this.prisma.message.findMany({
      where: {
        channelName: params.channelName
      }
    })
  }

  async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return await this.prisma.message.create({
      data,
    });
  }

  async createChannelMessage(data: Prisma.MessageCreateInput): Promise<Message>
  {
    console.log("createChannelMessage : channel_name : " + data.channelName + " | content : " + data.content + " | fromUserName : " + data.fromUserName);
    return await this.prisma.message.create({
      data,
    });
  }

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
