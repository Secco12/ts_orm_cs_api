import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import Local from "./Local";

@Entity('tb_mapa')
class Mapa{
    @PrimaryColumn('int')
    id: number;

    @Column('text')
    nome: string;

    @OneToMany(() => Local, local => local.mapa)
    locais: Local[];
}
export default Mapa;