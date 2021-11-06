export interface Order {
    id_cliente:     string;
    id_tabela:      number;
    id_prazo:       number;
    promo:          string;
    promo_aut_por:  string;
    promo_data_aut: string;
    comentario:     string;
    compra:         string;
    frete:          string;
    paletizacao:    string;
    agendamento:    string;
    vendedor:       string;
    cod_vendedor:   string;
    pag_prazo:      string;
    cliente:        string;
    cod_cliente:    string;
    cnpj:           string;
    fantasia:       string;
    ie:             string;
    email:          string;
    cel:            string;
    tel:            string;
    ddd:            string;
    cidade:         string;
    estado:         string;
    datas:          Date;
    ipi:            number;
    total:          number;
    produtos:       OrderProduct[]
}

export interface OrderProduct {
    id_produto: number;
    cod:        number;
    nome:       string;
    qtde:       number;
    valor:      number;
    ipi:        number;
    desconto:   number;
}