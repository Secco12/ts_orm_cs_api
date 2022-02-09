import {app, setup} from "../../index";
import { afterAll, describe, expect, test, beforeAll } from "@jest/globals";
import supertest from "supertest";
import { getConnection } from "typeorm";
import { readConfigFile } from "typescript";
                                  //
//  OOOO      J EEEE AAAA Nn N   EEEE   U  U Mm mM   Mm mM AAAA CCCC AAAA CCCC OOOO
//  O  O   J  J ee   AaaA NNNN   ee     U  U MMMMM   MMMMM AaaA C    AaaA C    O  O
//  OOOO   JJJJ EEEE A  A N nN   EEEE   UUUU M   M   M   M A  A CCCC A  A CCCC OOOO
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
        const rec = await agent.post('/partida/list');
        var partId = {id: 1}
        expect(ret.statusCode).toEqual(200);
        console.log(`rec:${rec.body}`)
        console.log(ret.body)
        if (ret.body.length > 0) {
            for(const p of ret.body){
                console.log(`Removendo a partida ${p.id}`);
                const postDeletePartida = await agent.post('/partida/delete/1')
                console.log(postDeletePartida.body)

                console.log(`Removendo o jogador ${p.nickname}`);
                const postDeleteJogador = await agent.post('/jogador/delete').send({"nickname": p.nickname});

            }
          
        }else{
            console.log("Não foi encontrado nenhuma partida, registrando nova partida e novo jogador.");
            const postCreateJogador = await agent.post('/jogador/store').send({"nickname": "t@gl.com", "senha": "11111", "pontos": 10, "endereco": "0"})
            const postFindJogador = await agent.post('/jogador/find').send({"nickname": "t@gl.com"})
            const data = {
                "id": 1,
                "inicio": "2022-01-13",
                "fim": "2022-01-14",
                "jogador": postFindJogador.body
            }
            console.log(postCreateJogador.body)
            const postCreatePartida = await agent.post('/partida/store').send(data);
        }
    })
})