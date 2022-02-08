import { Request, Response } from "express";
import {getRepository} from 'typeorm';
import Jogador from "../models/Jogador";
import Endereco  from "../models/Endereco";
class PlayerController{
    async delete(req: Request, res: Response){
        const repository = getRepository(Jogador);
        const{nickname, endereco} = req.body;
        const nicknameExists = await repository.findOne({where: {"nickname": nickname}});

        if(nicknameExists){
            await repository.remove(nickname);
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }   
    }
    async store(req: Request, res: Response){
        const repository = getRepository(Jogador);
        const {nickname, endereco} = req.body;
        const nicknameExists = await repository.findOne({where: {nickname}});
        if(nicknameExists){
            return res.sendStatus(409);
        }
        if(!endereco){
            return res.sendStatus(404);
        }
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j)
    }
    async update(req: Request, res: Response){
        const repository = getRepository(Jogador);
        const{nickname, endereco} = req.body;
        const nicknameExists = await repository.findOne({where: {nickname}});
        const EnderecoExists = await getRepository(Endereco).findOne({where: {"id": endereco.id}});
        if(!endereco || !nicknameExists || !EnderecoExists){
            return res.sendStatus(404);
        }
        const j = repository.create(req.body);
        await repository.save(j);
        return res.json(j)
    }
    async list(req: Request, res: Response){
        const repository = getRepository(Jogador);
        const list = await repository.createQueryBuilder('tb_jogador').innerJoinAndSelect("tb_jogador.endereco", "endereco").leftJoinAndSelect("tb_jogador.patentes", "patente").getMany();
        return res.json(list);
    }
    async find(req: Request, res: Response){
        const repository = getRepository(Jogador);
        const {nickname} = req.body;
        const end = await repository.findOne({where: {nickname}});
        if(end){
            return res.json(end);
        }else{
            return res.sendStatus(404)
        }
    }
}
export default new PlayerController();