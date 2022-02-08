import { createConnection } from "typeorm";
export async function setup(){
    //console.log(__dirname);
    await createConnection().then(() => console.log('Conectado no Banco de Dados!!!'))
}