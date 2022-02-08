import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Jogador from "../models/Jogador";
import Arma from "../models/Arma";
import Municao from "../models/Municao";
import Artefato from "../models/Artefato";

class ArtefatoController{
    async store(req: Request, res: Response){
        const {type} = req.body;
        if(type == "Arma"){
            const repository = getRepository(Arma);
            const j = repository.create(req.body);

            await repository.save(j);
            return res.json(j)
        }else if(type == "Municao"){
            const repository = getRepository(Municao);
            const j = repository.create(req.body);

            await repository.save(j);
            return res.json(j);
        }else{
            return res.sendStatus(404);
        }
    }
    async update(req: Request, res: Response){
        const {id, type} = req.body;
        if(id){
            if(type == "Arma"){
                const repository = getRepository(Arma);
                const j =repository.create(req.body);

                await repository.save(j);
                return res.json(j);
            }else if(type == "Municao"){
                const repository = getRepository(Municao);
                const j = repository.create(req.body);

                await repository.save(j);
                return res.json(j);
            }else{
                return res.sendStatus(404);
            }
        }else{
            return res.sendStatus(404);
        }
    }
    async list(req: Request, res: Response){
        const repository = getRepository(Artefato);
        const list = await repository.createQueryBuilder('tb_artefato').getMany();
        return res.json(list);
    }
}
export default new ArtefatoController();