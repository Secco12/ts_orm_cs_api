import {app, setup} from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";

describe("persistence test", () =>{
    beforeAll(async () => {
        await setup()
    });
    afterAll(async () =>{
        await getConnection().close()
    });
    
    it('test /endereco/list e /endereco/delete', async () =>{
        var agent = supertest(app);
        const postList = await agent.post('/endereco/list');
        expect(postList.statusCode).toEqual(200);
        console.log('Encontrado ${postList.body.length} endereços registrados')
        if(postList.body.length > 0){
            for(const e of postList.body){
                const data = { "id": 1};
                const postDelete = await agent.post('/endereco/delete').send(data);
                expect(postDelete.statusCode).toEqual(204);
            }
        }else{
            console.log("Não foi encontrado nenhum endereço registrado, registrando novo...")
            const data = {"id": "1", "cep": "99010250", "complemento": "402"};
            const postCreate = await agent.post('/endereco/store').send(data);
            expect(postCreate.statusCode).toEqual(200);
        }
    });
    it('test /jogador/list e /jogador/delete', async () => {
        var agent = supertest(app);
        const ret = await agent.post('/jogador/list');
        expect(ret.statusCode).toEqual(200);
        if(ret.body.length > 0){
            console.log('Encontrado ${ret.body.length} jogadores registrados');
            for(const p of ret.body){
                const data = {"nickname": p.nickname};
                console.log('Removendo o jogador ${data.nickname}');
                const postDeleteJogador = await agent.post('/jogador/delete').send(data);
                expect(postDeleteJogador.statusCode).toEqual(204);
                console.log('Removendo o endereço ${p.endereco.id}');
                const postDeleteEndereco = await agent.post('/endereco/delete').send({"id": p.endereco.id});
                expect(postDeleteEndereco.statusCode).toEqual(204);
            }
        }else{
            console.log("Não foi encontrado nenhum jogador, registrando novo jogador e novo endereço.");
            const postCreateEndereco = await agent.post('/endereco/store').send({"id": 2,"cep": "99010010"});
            expect(postCreateEndereco.statusCode).toEqual(200);
            const postFindEndereco = await agent.post('/endereco/find').send({"cep": "99010010"});
            expect(postFindEndereco.statusCode).toEqual(200);
            const data = {
                "nickname": "t@gl.com",
                "senha": "11111",
                "pontos": 10,
                "endereco": postFindEndereco.body
            };
            const postCreateJogador = await agent.post('/jogador/store').send(data);
            expect(postCreateJogador.statusCode).toEqual(200)
        }
    });
});