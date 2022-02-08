import {app, setup} from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";

describe("persistencia trabalho test ", () =>{
    beforeAll(async () =>{
        await setup()
    });
    afterAll(async () =>{
        await getConnection().close()
    });

    it('test /jogador e /partida', async () =>{
        var agent = supertest(app);
        const ret = await agent.post('/jogador/list');
        expect(ret.statusCode).toEqual(200);
        if (ret.body.length > 0) {
            for(const p of ret.body){
                const data = {"id": p.id};
                console.log('Removendo a partida ${data.id}');
                const postDeletePartida = await agent.post('/partida/delete').send(data);
                expect(postDeletePartida.statusCode).toEqual(204);
                console.log('Removendo o jogador ${p.jogador.nickname}');
                const postDeleteJogador = await agent.post('/jogador/delete').send({"nickname": p.jogador.nickname});
                expect(postDeleteJogador.statusCode).toEqual(204);
            }
          
        }else{
            console.log("Não foi encontrado nenhuma partida, registrando nova partida e novo jogador.");
            const postCreateJogador = await agent.post('/jogador/store').send({"nickname": "t@gl.com", "senha": "11111", "pontos": 10, "endereco": 1})
            expect(postCreateJogador.statusCode).toEqual(200);
            const postFindJogador = await agent.post('/jogador/find').send({"nickname": "t@gl.com"})
            expect(postFindJogador.statusCode).toEqual(200);
            const data = {
                "id": 1,
                "inicio": "2022-01-13",
                "fim": "2022-01-14",
                "jogador": postFindJogador.body
            }
            const postCreatePartida = await agent.post('/partida/store').send(data);
            expect(postCreatePartida.statusCode).toEqual(200);
        }
    })
})