import * as bcrypt from 'bcrypt';


export class EncryptPassword{

    public static async encryptPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    public static async comparePassword(password: string, passwordHash: string): Promise<boolean>{
        return await bcrypt.compare(password, passwordHash);
    }
}