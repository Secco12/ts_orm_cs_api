import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import Partida from "./Partida";
import Objetivo from "./Objetivo";
import { Modo } from "./Modo"; 

@Entity('tb_round')
class Round{
    @PrimaryColumn('int')
    id:number;

    @Column()
    numero: number;

    @Column('timestamp')
    inicio: Date;

    @Column('timestamp')
    fim: Date;

    @Column({
        type: "enum",
        enum: Modo,
    })
    modo:Modo;

    @ManyToMany(type => Partida)
    @JoinColumn({name: "partida_id", referencedColumnName: "id"})
    partida:Partida;

    @ManyToMany(() => Objetivo)
    @JoinTable({name: "tb_round_objetivo", joinColumn:{name:"round_id", referencedColumnName: "id"}, inverseJoinColumn:{name:"objetivo_id", referencedColumnName:"id"}})
    objetivos:Objetivo[];
}
export default Round;