export interface Product {
    id_produto: number;
    id_lab:     number;
    nome:       string;
    qtde:       number;
    tipo:       'CX' | 'UN';
    upc:        number;
    valor:      number;
    ipi:        number;
    comissao:   number;
    desconto:   number;
    total:      number;
    cod:        number;
}