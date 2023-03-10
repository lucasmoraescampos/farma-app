import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { CREATE_TABLES } from '../data/create_tables';
import { Customer } from '../models/customer';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {

  constructor(
    private sqlite: SQLite
  ) { }

  private getDB() {
    return this.sqlite.create({ name: 'francefarma.db', location: 'default' });
  }

  public async createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        db.sqlBatch(CREATE_TABLES);
      })
      .catch(err => console.log(err));
  }

  public async getDashboard() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM dashboard', []);

    if (result.rows.length > 0) {
      return result.rows.item(0);
    }

    else {
      return null;
    }

  }

  public async setDashboard(data: any) {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM dashboard', []);

    const params = [data.valor_faturado, data.valor_meta, data.total_clientes, data.total_positivos];

    if (result.rows.length == 0) {
      db.executeSql('INSERT INTO dashboard (id, valor_faturado, valor_meta, total_clientes, total_positivos) VALUES (1, ?, ?, ?, ?)', params);
    }

    else {
      db.executeSql('UPDATE dashboard SET valor_faturado = ?, valor_meta = ?, total_clientes = ?, total_positivos = ? WHERE id = 1', params);
    }

  }

  public async getPaymentOptions() {

    const db: SQLiteObject = await this.getDB();

    let result = await db.executeSql('SELECT * FROM prazos ORDER BY nome ASC', []);

    const prazos = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        prazos.push(result.rows.item(i));
      }

    }

    result = await db.executeSql('SELECT * FROM tabelas', []);

    const tabelas = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        tabelas.push(result.rows.item(i));
      }

    }

    result = await db.executeSql('SELECT * FROM labs ORDER BY nome ASC', []);

    const labs = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        labs.push(result.rows.item(i));
      }

    }

    return {
      prazos: prazos,
      tabelas: tabelas,
      labs: labs
    };

  }

  public async setPaymentOptions(data: any) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM prazos', []);

    await db.executeSql('DELETE FROM tabelas', []);

    await db.executeSql('DELETE FROM labs', []);

    const sql = [];

    for (let i = 0; i < data.prazos.length; i++) {

      const params = [data.prazos[i].id_prazo, data.prazos[i].nome, data.prazos[i].valor, data.prazos[i].status];

      sql.push(['INSERT INTO prazos (id_prazo, nome, valor, status) VALUES (?, ?, ?, ?)', params]);

    }

    for (let i = 0; i < data.tabelas.length; i++) {

      const params = [data.tabelas[i].id_tabela, data.tabelas[i].descricao];

      sql.push(['INSERT INTO tabelas (id_tabela, descricao) VALUES (?, ?)', params]);

    }

    for (let i = 0; i < data.labs.length; i++) {

      const params = [data.labs[i].id_lab, data.labs[i].nome, data.labs[i].status];

      sql.push(['INSERT INTO labs (id_lab, nome, status) VALUES (?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async getCustomers(page: number) {

    if (page < 1) page = 1;

    const limit = 50;

    const offset = (page - 1) * limit;

    const db: SQLiteObject = await this.getDB();

    let result = await db.executeSql(`SELECT * FROM clientes ORDER BY razao_social LIMIT ${limit} OFFSET ${offset}`, []);

    const customers = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        customers.push(result.rows.item(i));
      }

    }

    result = await db.executeSql('SELECT COUNT(*) as count FROM clientes', []);

    const total = result.rows.item(0).count;

    return {
      customers: customers,
      total: total
    };

  }

  public async getUnsyncCustomers() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM clientes WHERE sync = 0', []);

    const customers = [];

    if (result.rows.length > 0) {

      for (let i=0; i < result.rows.length; i++) {
        customers.push(result.rows.item(i));
      }

    }

    return customers;

  }

  public async setCustomers(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM clientes', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_cliente, data[i].razao_social, data[i].fantasia, data[i].email, data[i].cep, data[i].end, data[i].bairro, data[i].cidade, data[i].ddd, data[i].tel, data[i].cnpj, data[i].ie];

      sql.push(['INSERT INTO clientes (id_cliente, razao_social, fantasia, email, cep, end, bairro, cidade, ddd, tel, cnpj, ie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async createCustomer(customer: Customer) {

    const db: SQLiteObject = await this.getDB();

    const cnpj = customer.cnpj.replace(/[^0-9]/g, '');

    let result = await db.executeSql(`SELECT COUNT(*) AS count FROM clientes WHERE REPLACE(REPLACE(REPLACE(cnpj, '/', ''), '-', ''), '.', '') = ? LIMIT 1`, [cnpj]);
    
    if (result.rows.item(0).count > 0) {

      throw {
        message: 'Esse CNPJ j?? foi cadastrado'
      }

    }

    else {

      const params = [customer.cnpj, customer.razao_social, customer.cnpj, customer.cel, customer.email, customer.grupo, customer.fantasia, customer.ie, customer.ddd, customer.tel, customer.cep, customer.end, customer.bairro, customer.cidade, customer.estado, customer.ref1, customer.refnum1, customer.ref2, customer.refnum2, customer.ref3, customer.refnum3];

      const sql = 'INSERT INTO clientes (id_cliente, razao_social, cnpj, cel, email, grupo, fantasia, ie, ddd, tel, cep, end, bairro, cidade, estado, ref1, refnum1, ref2, refnum2, ref3, refnum3, sync) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)';

      await db.executeSql(sql, params);

      result = await db.executeSql('SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1', [customer.cnpj]);

      return result.rows.item(0);

    }
    
  }

  public async searchCustomers(search: string) {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql(`SELECT * FROM clientes WHERE razao_social LIKE '%${search}%' OR REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', '') LIKE '%${search}%' ORDER BY razao_social`, []);

    const customers = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        customers.push(result.rows.item(i));
      }

    }

    return customers;

  }

  public async getPositiveCustomers() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM clientes_positivados ORDER BY razao_social', []);

    const customers = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        customers.push(result.rows.item(i));
      }

    }

    return customers;

  }

  public async setPositiveCustomers(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM clientes_positivados', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].razao_social, data[i].cnpj];

      sql.push(['INSERT INTO clientes_positivados (razao_social, cnpj) VALUES (?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async getExpiredCustomers() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM clientes_vencidos ORDER BY razao_social', []);

    const customers = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        customers.push(result.rows.item(i));
      }

    }

    return customers;

  }

  public async setExpiredCustomers(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM clientes_vencidos', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_cliente, data[i].razao_social, data[i].fantasia, data[i].email, data[i].cep, data[i].end, data[i].bairro, data[i].cidade, data[i].ddd, data[i].tel, data[i].cnpj, data[i].ie, data[i].empresa, data[i].juros, data[i].nota, data[i].pedido, data[i].status, data[i].tipo_documento, data[i].valor, data[i].venc];

      sql.push(['INSERT INTO clientes_vencidos (id_cliente, razao_social, fantasia, email, cep, end, bairro, cidade, ddd, tel, cnpj, ie, empresa, juros, nota, pedido, status, tipo_documento, valor, venc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async getLabs() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM labs ORDER BY nome', []);

    const labs = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        labs.push(result.rows.item(i));
      }

    }

    return labs;

  }

  public async setLabs(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM labs', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_lab, data[i].nome, data[i].status];

      sql.push(['INSERT INTO labs (id_lab, nome, status) VALUES (?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async getProducts(lab?: number | string) {

    const db: SQLiteObject = await this.getDB();

    let sql = 'SELECT * FROM produtos';

    if (lab) {
      sql += ` WHERE id_lab = '${lab}' ORDER BY nome`;
    }

    const result = await db.executeSql(sql, []);

    const labs = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        labs.push(result.rows.item(i));
      }

    }

    return labs;

  }

  public async setProducts(data: any[], lab?: number | string) {

    const db: SQLiteObject = await this.getDB();

    let delete_sql = 'DELETE FROM produtos';

    if (lab) {
      delete_sql += ' WHERE id_lab = ' + lab;
    }

    await db.executeSql(delete_sql, []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_produto, data[i].id_lab, data[i].nome, data[i].upc, data[i].ipi, data[i].estoque, data[i].valor_01, data[i].status];

      sql.push(['INSERT INTO produtos (id_produto, id_lab, nome, upc, ipi, estoque, valor_01, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

  public async getOrders(page: number) {

    if (page < 1) page = 1;

    const limit = 50;

    const offset = (page - 1) * limit;

    const db: SQLiteObject = await this.getDB();

    let result = await db.executeSql(`SELECT datas, status, id_pedido, total, ipi, cliente, sync FROM pedidos LIMIT ${limit} OFFSET ${offset}`, []);

    const orders = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        orders.push(result.rows.item(i));
      }

    }

    result = await db.executeSql('SELECT COUNT(*) as count FROM pedidos', []);

    const total = result.rows.item(0).count;

    return {
      orders: orders,
      total: total
    };

  }

  public async getUnsyncOrders() {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM pedidos WHERE sync = 0', []);

    const orders = [];

    if (result.rows.length > 0) {

      for (let i=0; i < result.rows.length; i++) {

        const order = result.rows.item(i);

        order.produtos = [];

        const res = await db.executeSql('SELECT * FROM pedido_itens WHERE id_pedido = ?', [order.id_pedido]);

        for (let j=0; j < res.rows.length; j++) {
          order.produtos.push(res.rows.item(j));
        }

        orders.push(order);

      }

    }

    return orders;

  }

  public async searchOrders(search: string) {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql(`SELECT datas, status, id_pedido, total, ipi, cliente, sync FROM pedidos WHERE cliente LIKE '%${search}%' OR id_pedido = '${search}'`, []);

    const orders = [];

    if (result.rows.length > 0) {

      for (let i = 0; i < result.rows.length; i++) {
        orders.push(result.rows.item(i));
      }

    }

    return orders;

  }

  public async getOrderById(id: number) {

    const db: SQLiteObject = await this.getDB();

    let result = await db.executeSql(`SELECT * FROM pedidos WHERE id_pedido = ? LIMIT 1`, [id]);

    if (result.rows.length > 0) {

      const order = result.rows.item(0);

      order.produtos = [];

      result = await db.executeSql(`SELECT * FROM pedido_itens WHERE id_pedido = ?`, [id]);

      if (result.rows.length > 0) {

        for (let i = 0; i < result.rows.length; i++) {
          order.produtos.push(result.rows.item(i));
        }

      }

      return order;

    }

    else {
      return null;
    }

  }

  public async setOrders(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM pedido_itens', []);

    await db.executeSql('DELETE FROM pedidos', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_pedido, data[i].pag_prazo, data[i].promo, data[i].promo_aut_por, data[i].promo_data_aut, data[i].comentario, data[i].vendedor, data[i].cod_vendedor, data[i].cliente, data[i].cod_cliente, data[i].cnpj, data[i].fantasia, data[i].ie, data[i].novo, data[i].email, data[i].ddd, data[i].tel, data[i].cidade, data[i].estado, data[i].total, data[i].ipi, data[i].motivocancelamento, data[i].datas, data[i].status];

      sql.push(['INSERT INTO pedidos (id_pedido, pag_prazo, promo, promo_aut_por, promo_data_aut, comentario, vendedor, cod_vendedor, cliente, cod_cliente, cnpj, fantasia, ie, novo, email, ddd, tel, cidade, estado, total, ipi, motivocancelamento, datas, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params]);

      for (let j = 0; j < data[i].produtos.length; j++) {

        const params = [data[i].produtos[j].id_pedido, data[i].produtos[j].id_produto, data[i].produtos[j].nome, data[i].produtos[j].cod, data[i].produtos[j].qtde, data[i].produtos[j].valor, data[i].produtos[j].ipi, data[i].produtos[j].comissao, data[i].produtos[j].faturado];

        sql.push(['INSERT INTO pedido_itens (id_pedido, id_produto, nome, cod, qtde, valor, ipi, comissao, faturado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', params]);

      }

    }

    db.sqlBatch(sql);

  }

  public async createOrder(order: Order) {

    const db: SQLiteObject = await this.getDB();

    const id_pedido = Math.floor(Date.now() / 1000);

    let params = [
      id_pedido,
      order.id_prazo,
      order.id_tabela,
      order.id_cliente,
      order.pag_prazo,
      order.promo,
      order.promo_aut_por,
      order.promo_data_aut,
      order.comentario,
      order.vendedor,
      order.cod_vendedor,
      order.cliente,
      order.cod_cliente,
      order.cnpj,
      order.fantasia,
      order.ie,
      order.email,
      order.ddd,
      order.tel,
      order.cel,
      order.cidade,
      order.estado,
      order.frete,
      order.agendamento,
      order.paletizacao,
      order.compra,
      order.total,
      order.ipi,
      order.datas,
      '1',
      0
    ];

    const sql = [
      ['INSERT INTO pedidos (id_pedido, id_prazo, id_tabela, id_cliente, pag_prazo, promo, promo_aut_por, promo_data_aut, comentario, vendedor, cod_vendedor, cliente, cod_cliente, cnpj, fantasia, ie, email, ddd, tel, cel, cidade, estado, frete, agendamento, paletizacao, compra, total, ipi, datas, novo, sync) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params]
    ];

    for (let i=0; i < order.produtos.length; i++) {

      params = [
        id_pedido,
        order.produtos[i].id_produto,
        order.produtos[i].qtde,
        order.produtos[i].desconto,
        order.produtos[i].ipi,
        order.produtos[i].cod,
        order.produtos[i].nome,
        order.produtos[i].valor
      ];

      sql.push([`INSERT INTO pedido_itens (id_pedido, id_produto, qtde, desconto, ipi, cod, nome, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, params]);

    }

    await db.sqlBatch(sql);

    let result = await db.executeSql('SELECT * FROM pedidos WHERE id_pedido = ? LIMIT 1', [id_pedido]);

    const order_ = result.rows.item(0);

    result = await db.executeSql('SELECT * FROM pedido_itens WHERE id_pedido = ?', [id_pedido]);

    order_.produtos = [];

    for (let i=0; i < result.rows.length; i++) {
      order_.produtos.push(result.rows.item(i));
    }

    return order_;
    
  }

  public async getTableProduct(table_id: number | string, product_id: number | string) {

    const db: SQLiteObject = await this.getDB();

    const result = await db.executeSql('SELECT * FROM tabelas_produtos WHERE id_tabela = ? AND id_produto = ? LIMIT 1', [table_id, product_id]);

    if (result.rows.length > 0) {
      return result.rows.item(0);
    }

    else {
      return null;
    }

  }

  public async setTablesProducts(data: any[]) {

    const db: SQLiteObject = await this.getDB();

    await db.executeSql('DELETE FROM tabelas_produtos', []);

    const sql = [];

    for (let i = 0; i < data.length; i++) {

      const params = [data[i].id_produto, data[i].id_tabela, data[i].valor, data[i].upc, data[i].estoque];

      sql.push(['INSERT INTO tabelas_produtos (id_produto, id_tabela, valor, upc, estoque) VALUES (?, ?, ?, ?, ?)', params]);

    }

    db.sqlBatch(sql);

  }

}