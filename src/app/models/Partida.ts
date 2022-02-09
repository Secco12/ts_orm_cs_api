import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";
import Jogador from "./Jogador";
import Round from "./Round";

@Entity('tb_partida')
export default class Partida extends BaseEntity{
    @PrimaryColumn('int')
    id: number;

    @Column('timestamp')
    inicio: Date;

    @Column('timestamp')
    fim: Date;

    @ManyToOne(type => Jogador)
    @JoinColumn({name: "jogador_nickname", referencedColumnName: "nickname"})
    jogador:Jogador;

    @OneToMany(() => Round, round => round.partida)
    rounds:Round[];
}