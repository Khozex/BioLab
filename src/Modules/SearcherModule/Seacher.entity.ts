import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Seacher{
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    matriculation: string;

    @Column()
    lattesLink: string;

    @Column()
    area_of_interest: string;

    @Column()
    active: boolean;
}