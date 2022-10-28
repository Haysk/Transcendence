import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { UserService } from "./user.service";

@Injectable()
export class FriendService {
    constructor(private prisma: PrismaService,
        private httpClient: HttpService,
        private userService: UserService) { }

    INTRA_API = "https://api.intra.42.fr";

}