import { Cliente } from '../modelo/Cliente'
import {Conexao} from '../bancodedados/conexao'

const table = "cliente"
const db=Conexao.getConnection()

export default class ClienteServico {
     static addData(param: Cliente) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO ${table} (nome,sobrenome,email,senha,telefone) 
                VALUES (?,?,?,?,?)`, 
                [param.nome, param.sobrenome, param.email, param.senha, param.telefone], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`DELETE FROM ${table} WHERE id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


     static updateByObjeto(param: Cliente) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`UPDATE ${table} SET nome = ?, sobrenome = ?, email = ?, senha = ?, telefone = ? where id = ?;`, [param.nome,param.sobrenome,param.email,param.senha,param.telefone, param.id], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${table} WHERE id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

      static findAll() {        
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}
