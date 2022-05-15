import { Controller, Post, Get, Delete, HttpStatus, Res, Body, Put, Param, Patch } from "@nestjs/common";
import { Response } from 'express';
import { Seacher } from './Seacher.entity';
import { SeacherService } from './Seacher.service';
import { SeacherDto } from "./SeacherDTO.entity";

@Controller('seacher')
export class SeacherController {
    constructor(private seacherService: SeacherService) { }

    @Post()
    async create(@Res() res: Response, @Body() seacher: Seacher): Promise<void> {
        try {
            await this.seacherService.create(seacher);
            res.status(HttpStatus.OK).json({ message: "Seacher created" });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        }
    }

    @Delete()
    async delete(@Res() res: Response, email: string): Promise<void> {
        try {
            await this.seacherService.delete(email);
            res.status(HttpStatus.OK).json({ message: "Seacher deleted" });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        }
    }

    @Get()
    async findSeacherByEmail(@Res() res: Response, email: string): Promise<void> {
        try {
            const seacher = await this.seacherService.findOneByEmail(email);
            res.status(HttpStatus.OK).json(seacher);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        }
    }

    @Put(':id')
    async updateSeacher(@Param('id') id: number, @Res() res: Response, @Body() seacher: Seacher): Promise<void> {
        try {
            const seacherResult = await this.seacherService.update(id, seacher);
            res.status(HttpStatus.OK).json(seacherResult)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
        }
    }

    @Patch(':id')
    async updateFieldSeacher(@Param('id') id: number, @Res() res: Response, @Body() seacher: SeacherDto): Promise<void> {
        try {
            const seacherResult = await this.seacherService.updateField(id, seacher)
            res.status(HttpStatus.OK).json(seacherResult)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
        }
    }

    @Get(':id')
    async getUserWithId(@Param('id') id: number, @Res() res: Response): Promise<void> {
        try {
            const seacher = await this.seacherService.findById(id);
            res.status(HttpStatus.OK).json(seacher)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
        }
    }
}   