import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import Local from "./Local";

@Entity('tb_objetivo')
export default class Objetivo{
    @PrimaryColumn('int')
    id: number;

    @Column("varchar", {length: 200})
    descricao: string;

    @Column()
    pontos: number;

    @OneToMany(() => Local, local => local.objetivo)
    locais: Local[];
    
}