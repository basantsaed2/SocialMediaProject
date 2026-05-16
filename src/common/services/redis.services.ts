import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";
import { Types } from "mongoose";
import { NotFoundException } from "../exceptions/app.exception";

export class RedisService {
    private client: RedisClientType;
    constructor() {
        this.client = createClient({
            url: env.REDIS_URL
        });
        this.handleConnection();
    }

    async handleConnection() {
        this.client.on("error", (error) => {
            console.log("Redis error", error);
        })

        this.client.on("ready", () => {
            console.log("Redis ready");
        })

        this.client.on("end", () => {
            console.log("Redis disconnected");
        })
    }

    async connect(): Promise<void> {
        await this.client.connect()
        console.log("Redis connected");
    }


    createRevokeKey = ({ id, token }: { id: Types.ObjectId, token: string }): string => {
        return `revokeToken::${id}::${token}`;
    }

    set = async ({ key, value, ttl }:
        {
            key: string;
            value: any;
            ttl?: number;
        }): Promise<string | null> => {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        return ttl ? await this.client.set(key, value, { EX: ttl }) : await this.client.set(key, value);
    }

    get = async (key: string): Promise<string | null> => {
        const value = await this.client.get(key);
        if (!value) throw new NotFoundException(`key ${key} not found`);
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    del = async (key: string): Promise<number> => {
        return await this.client.del(key);
    }

    update = async ({ key, value, ttl }: {
        key: string;
        value: any;
        ttl?: number;
    }): Promise<string | null> => {
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        return ttl ? await this.client.set(key, value, { EX: ttl }) : await this.client.set(key, value);
    }

    ttl = async (key: string): Promise<number> => {
        return await this.client.ttl(key);
    }

    exists = async (key: string): Promise<number> => {
        return await this.client.exists(key);
    }

    expire = async (key: string, ex: number): Promise<number> => {
        return await this.client.expire(key, ex);
    }

    mget = async (...keys: string[]): Promise<(string | null)[]> => {
        return await this.client.mGet(keys);
    }

    keys = async (pattern: string): Promise<string[]> => {
        return await this.client.keys(`${pattern}*`);
    }

}

export const redisService = new RedisService();
