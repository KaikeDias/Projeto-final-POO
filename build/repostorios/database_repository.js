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
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
class DatabaseRepository {
    static inicializar(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const repositorio = new DatabaseRepository();
            repositorio._database = yield (0, sqlite_1.open)({ filename: nome, driver: sqlite3_1.default.Database });
            yield repositorio._database.exec(`
        CREATE TABLE IF NOT EXISTS VEICULO (
            VEICULO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            PLACA VARCHAR(50) NOT NULL,
            MODELO VARCHAR(50) NOT NULL,
            QUILOMETRAGEM INTEGER NOT NULL,
            CATEGORIA VARCHAR(50) NOT NULL,
            VALOR FLOAT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS FUNCIONARIO(
            FUNCIONARIO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            CPF VARCHAR(50) NOT NULL,
            NOME VARCHAR(50) NOT NULL,
            ENDERECO VARCHAR(100) NOT NULL,
            TELEFONE VARCHAR(50) NOT NULL,
            SALARIO FLOAT NOT NULL,
            IS_ADMIN BOOL NOT NULL
        );
        `);
            return repositorio;
        });
    }
    get database() {
        return this._database;
    }
    finalizar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._database.close();
        });
    }
}
exports.default = DatabaseRepository;
