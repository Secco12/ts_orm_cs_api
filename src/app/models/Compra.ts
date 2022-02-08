import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import Jogador from './Jogador';
import Compraitens from './CompraItens';

@Entity('tb_compra')
class Compra{
    @PrimaryColumn('int')
    id: number;

    @Column('timestamp')
    data: Date;

    @Column()
    total: number;

    @ManyToOne(type => Jogador)
    @JoinColumn({name: "jogador_nickname", referencedColumnName: "nickname"})
    jogador: Jogador;

    @OneToMany(() => Compraitens, compraitens => compraitens.compra)
    compraitens: Compraitens[];
}
export default Compra;