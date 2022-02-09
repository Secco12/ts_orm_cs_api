import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Partida from "../models/Partida";

class PartidaController{
    async list(req: Request, res: Response){
        const repository = getRepository(Partida);
        const list = await repository.createQueryBuilder('tb_partida').innerJoinAndSelect("tb_partida.jogador", "jogador").getMany();
        return res.json(list);
    }

    async store(req: Request, res: Response){
        const repository = getRepository(Partida);
        const {id, jogador} = req.body;
        const idExists = await repository.findOne({where:{id}})
        if(idExists){
            return res.sendStatus(409);
        }
        if(!jogador){
            return res.sendStatus(404)
        }
        const j = repository.create(req.body)
        await repository.save(j);
        return res.json(j);
    }
    async delete(req: Request, res: Response){
        const {id} = req.params
        const response = await Partida.delete(id)
        return res.json(response)

    }
}
export default new PartidaController();