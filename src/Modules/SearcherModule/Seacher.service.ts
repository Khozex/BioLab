import { Injectable, Inject} from "@nestjs/common";
import { Repository} from "typeorm";
import { Seacher } from "./Seacher.entity";
import { EncryptPassword } from "../../Utils/EncryptPassword";

@Injectable()
export class SeacherService{
    

    constructor(
        @Inject("SEACHER_REPOSITORY") 
        private seacherRepository: Repository<Seacher>,
    ){
    }

    async create(seacher: Seacher) : Promise<Seacher>{
        if(await this.seacherRepository.findOneBy({email: seacher.email})){
            throw new Error("Seacher already exists!")
        }
        seacher.password = await EncryptPassword.encryptPassword(seacher.password);
        return await this.seacherRepository.save(seacher);

    }

    async deteleWithEmail(email: string) : Promise<void>{
        await this.seacherRepository.createQueryBuilder().delete().where("email = :email", {email: email}).execute();
    }

    async findOneByEmail(email: string) : Promise<Seacher>{
        return await this.seacherRepository.findOneBy({email: email});
    }

}