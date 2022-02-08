import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Artefato from "./Artefato";
import Compra from "./Compra";

@Entity('tb_compra_itens')
export default class Compraitens{
    @PrimaryColumn('int')
    id: number;

    @Column()
    quantidade: number;

    @Column()
    valor: number;

    @OneToOne(() => Artefato)
    @JoinColumn()
    artefato: Artefato;


    @ManyToOne(type => Compra)
    @JoinColumn({name: "compra_id", referencedColumnName: "id"})
    compra: Compra;
}