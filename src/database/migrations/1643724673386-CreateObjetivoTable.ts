import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateObjetivoTable1643724673386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_objetivo',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'descricao',
                    type: 'varchar(200)',
                    isNullable: false
                 },
                 {
                    name: 'pontos',
                    type: 'int',
                    isNullable: true,
                    default: 0
                 }
                 ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_objetivo');

    }

}
