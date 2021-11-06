import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ArrayHelper } from '../helpers/array.helper';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private key: string = '__cart__';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor() {
    this.init();
  }

  public setIdTabela(id_tabela: number) {

    const cart = this.currentUserSubject.value;

    if (cart.id_tabela != id_tabela) {
      cart.products = [];
    }

    cart.id_tabela = id_tabela;

    localStorage.setItem(this.key, JSON.stringify(cart));

    this.currentUserSubject.next(cart);

  }

  public addProduct(product: Product) {

    const cart = this.currentUserSubject.value;

    const index = ArrayHelper.getIndexByKey(cart.products, 'id', product.id_produto);

    if (product.tipo == 'UN') {
      product.qtde = product.qtde / product.upc;
    }

    if (index != -1) {
      cart.products[index] = product;
    }

    else {
      cart.products.push(product);
    }

    localStorage.setItem(this.key, JSON.stringify(cart));

    this.currentUserSubject.next(cart);

  }

  public deleteProduct(id: number) {

    const cart = this.currentUserSubject.value;

    const index = ArrayHelper.getIndexByKey(cart.products, 'id', id);

    cart.products = ArrayHelper.removeItem(cart.products, index);

    localStorage.setItem(this.key, JSON.stringify(cart));

    this.currentUserSubject.next(cart);

  }

  public clear() {

    const cart = {
      id_tabela: null,
      products: []
    }

    localStorage.setItem(this.key, JSON.stringify(cart));

    this.currentUserSubject.next(cart);

  }

  private init() {

    const cart = JSON.parse(localStorage.getItem(this.key));

    if (cart) {

      this.currentUserSubject.next(cart);

    }

    else {

      const cart = {
        id_tabela: null,
        products: []
      }

      localStorage.setItem(this.key, JSON.stringify(cart));

      this.currentUserSubject.next(cart);

    }

  }

}