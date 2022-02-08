import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import Mapa from "./Mapa";
import Objetivo from "./Objetivo";

@Entity('tb_local')
class Local{
    @PrimaryColumn('int')
    id: number;

    @Column('text')
    nome: string;

    @Column("varchar")
    latitude: string;
    
    @Column("varchar")
    longitude: string;

    @ManyToOne(() => Mapa, mapa => mapa.locais)
    mapa: Mapa;

    @ManyToOne(() => Objetivo, objetivo => objetivo.locais)
    objetivo: Objetivo;

}
export default Local;