import { open, Database } from "sqlite";
import  sqlite3  from "sqlite3";

export default class DatabaseRepository {
    private _database!: Database

    static async inicializar(nome: string): Promise<DatabaseRepository> {
        const repositorio: DatabaseRepository = new DatabaseRepository()
        repositorio._database = await open({filename: nome, driver: sqlite3.Database})

        await repositorio._database.exec(`
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
        `)

        return repositorio;
    }

    get database() {
        return this._database
    }
    
    async finalizar(): Promise<void> {
        await this._database.close()
    }
}