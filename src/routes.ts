import { Router } from "express";
import JogadorController from "./app/controllers/JogadorController";
import AuthController from "./app/controllers/AuthController";
import EnderecoController from "./app/controllers/EnderecoController";
import CompraController from "./app/controllers/CompraController";
import CompraItensController from "./app/controllers/CompraItensController";
import PatenteController from "./app/controllers/PatenteController";
import ArtefatoController from "./app/controllers/ArtefatoController";
import PartidaController from "./app/controllers/PartidaController";
import ObjetivoController from "./app/controllers/ObjetivoController";
import RoundController from "./app/controllers/RoundController";
import ResultadoController from "./app/controllers/ResultadoController";
import MapaController from "./app/controllers/MapaController";
import LocalController from "./app/controllers/LocalController";

const router = Router();

router.post('/jogador/store', JogadorController.store);
router.post('/jogador/update', JogadorController.update);
router.post('/jogador/delete', JogadorController.delete);
router.post('/jogador/list', JogadorController.list);
router.post('/jogador/find', JogadorController.find);

router.post('/auth', AuthController.authenticate);

router.post('/endereco/store', EnderecoController.store);
router.post('/endereco/list', EnderecoController.list);
router.post('/endereco/find', EnderecoController.find);
router.post('/endereco/delete', EnderecoController.delete);

router.post('/compra/store', CompraController.store);
router.post('/compra/list', CompraController.list);

router.post('/compraitens/store', CompraItensController.store);
router.post('/compraitens/list', CompraItensController.list);

router.post('/patente/store', PatenteController.store);
router.post('/patente/list', PatenteController.list)

router.post('/artefato/store', ArtefatoController.store);
router.post('/artefato/list', ArtefatoController.list);
router.post('/artefato/update', ArtefatoController.update);

router.post('/partida/store', PartidaController.store);
router.post('/partida/list', PartidaController.list);
router.post('/partida/delete/:id', PartidaController.delete);

router.post('/objetivo/store', ObjetivoController.store);
router.post('/objetivo/list', ObjetivoController.list);

router.post('/round/store', RoundController.store);
router.post('/round/list', RoundController.list);

router.post('/resultado/store', ResultadoController.store);
router.post('/resultado/list', ResultadoController.list);

router.post('/mapa/store', MapaController.store)
router.post('/mapa/list', MapaController.list)

router.post('/local/store', LocalController.store)
router.post('/local/list', LocalController.list)


export default router;