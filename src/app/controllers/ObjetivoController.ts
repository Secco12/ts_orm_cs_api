import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Objetivo from "../models/Objetivo";

class ObjetivoController{
    async list(req: Request, res: Response){
        const repository = getRepository(Objetivo);
        const list = await repository.find();
        return res.json(list);
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Objetivo);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Objetivo);
            const {id} = req.body;
            const end = await repository.findOne({where: {"id": id}});
            if(end){
                await repository.remove(end);
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }catch(e:unknown){
            console.log(e);
            return res.sendStatus(500);
        }
    }
    async find(req: Request, res: Response){
        const repository = getRepository(Objetivo);
        const {descricao} = req.body;
        const end = await repository.findOne({where: {descricao}});
        if(end){
            return res.json(end);
        }else{
            return res.sendStatus(404)
        }
    }
}
export default new ObjetivoController();