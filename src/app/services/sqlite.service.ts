import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { CREATE_TABLES } from '../data/create_tables';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({ name: 'francefarma.db', location: 'default' });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public async createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        db.sqlBatch(CREATE_TABLES);
      })
      .catch(err => console.log(err));
  }
  
}