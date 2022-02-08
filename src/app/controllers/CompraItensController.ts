import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Compraitens from "../models/CompraItens";

class CompraItensController{
    async list(req: Request, res: Response){
        const repository = getRepository(Compraitens);
        const list = await repository.find();
        return res.json(list);
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Compraitens);
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j);
    }
}
export default new CompraItensController();