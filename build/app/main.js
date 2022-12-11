"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const veiculo_1 = require("../model/veiculo");
const database_repository_1 = __importDefault(require("../repostorios/database_repository"));
const repositorio_funcionarios_1 = require("../repostorios/repositorio_funcionarios");
const repositorio_veiculos_1 = require("../repostorios/repositorio_veiculos");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let repositorio = yield database_repository_1.default.inicializar('./../../database/data.db');
    let veiculoRepositorio = new repositorio_veiculos_1.RepositorioVeiculos(repositorio.database);
    let funcionarioRepositorio = new repositorio_funcionarios_1.RepositorioFuncionarios(repositorio.database);
    let veiculo = new veiculo_1.Veiculo(2, 'odv', 's10', 1000, 'sedan', 20000);
    let result = yield funcionarioRepositorio.listarFuncionarios();
    console.log(result);
}))();
