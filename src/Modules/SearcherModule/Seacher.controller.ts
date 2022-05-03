import { Controller, Post, Get, Delete,HttpStatus,Res } from "@nestjs/common";
import {Response} from 'express';
import {Seacher} from './Seacher.entity';
import {SeacherService} from './Seacher.service';

@Controller('seacher')
export class SeacherController{
    constructor(private seacherService: SeacherService){}

    @Post('create')
    async create(@Res() res: Response, seacher: Seacher) : Promise<void>{
        try{
            await this.seacherService.create(seacher);
            res.status(HttpStatus.OK).json({message: "Seacher created"});
        }catch(err){
            res.status(HttpStatus.BAD_REQUEST).json({message: err.message});
        }
    }

    @Delete('delete')
    async delete(@Res() res: Response, email: string) : Promise<void>{
        try{
            await this.seacherService.deteleWithEmail(email);
            res.status(HttpStatus.OK).json({message: "Seacher deleted"});
        }catch(err){
            res.status(HttpStatus.BAD_REQUEST).json({message: err.message});
        }
    }

    @Get('findOneByEmail')
    async findOneByEmail(@Res() res: Response, email: string) : Promise<void>{
        try{
            const seacher = await this.seacherService.findOneByEmail(email);
            res.status(HttpStatus.OK).json(seacher);
        }catch(err){
            res.status(HttpStatus.BAD_REQUEST).json({message: err.message});
        }
    }
}