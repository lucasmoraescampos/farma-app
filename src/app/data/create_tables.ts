export const CREATE_TABLES = [
    // ['DROP TABLE IF EXISTS cliente'],
    // ['DROP TABLE IF EXISTS produto'],
    [
        `CREATE TABLE IF NOT EXISTS dashboard (
            id INT(11) PRIMARY KEY,
            billed DECIMAL(15,2) DEFAULT NULL,
            goal DECIMAL(15,2) DEFAULT NULL,
            total_customers INT(11) DEFAULT NULL,
            total_positive_customers INT(11) DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS cliente (
            id_cliente VARCHAR(200) NOT NULL,
            razao_social VARCHAR(200) NOT NULL,
            fantasia VARCHAR(200) NULL DEFAULT NULL,
            email VARCHAR(200) NULL DEFAULT NULL,
            cep VARCHAR(200) NULL DEFAULT NULL,
            end VARCHAR(200) NULL DEFAULT NULL,
            bairro VARCHAR(200) NOT NULL,
            cidade VARCHAR(200) NULL DEFAULT NULL,
            tel VARCHAR(200) NULL DEFAULT NULL,
            cnpj VARCHAR(200) NULL DEFAULT NULL,
            ie VARCHAR(200) NULL DEFAULT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS produto (
            id_produto INT(11) PRIMARY KEY,
            id_lab VARCHAR(200) NOT NULL,
            nome VARCHAR(200) NOT NULL,
            upc INT(11) NULL DEFAULT NULL,
            ipi INT(11) NOT NULL DEFAULT 0,
            estoque BIGINT(20) NULL DEFAULT NULL,
            status CHAR(1) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS tabelas_produtos (
            id_produto INT(11) NOT NULL,
            id_tabela INT(11) NOT NULL,
            valor DOUBLE(8,2) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS prazo (
            id_prazo INT(11) PRIMARY KEY,
            nome VARCHAR(200) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS tabelas (
            id_tabela INT(11) PRIMARY KEY,
            descricao VARCHAR(200) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS usuario_has_tabelas (
            id_tablelas INT(11) NOT NULL,
            id_usuario VARCHAR(200) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (id_tablelas)
                REFERENCES tabelas (id_tabela)
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS lab (
            id_lab VARCHAR(200) NOT NULL,
            nome VARCHAR(200) NOT NULL,
            status CHAR(1) NOT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS pedido (
            id_pedido INT(11) PRIMARY KEY,
            datas DATE NULL DEFAULT NULL,
            pag_forma VARCHAR(200) NULL DEFAULT NULL,
            pag_prazo VARCHAR(200) NULL DEFAULT NULL,
            promo TEXT NULL DEFAULT NULL,
            promo_aut_por VARCHAR(200) NULL DEFAULT NULL,
            promo_data_aut VARCHAR(200) NULL DEFAULT NULL,
            comentario TEXT NULL DEFAULT NULL,
            id_cliente VARCHAR(200) NOT NULL,
            id_usuario VARCHAR(200) NOT NULL,
            total DOUBLE NOT NULL,
            diferenca DOUBLE NOT NULL,
            email CHAR(1) NOT NULL DEFAULT '0',
            datahora DATETIME NOT NULL,
            compra VARCHAR(200) NULL DEFAULT NULL,
            frete VARCHAR(200) NULL DEFAULT NULL,
            agendamento VARCHAR(200) NULL DEFAULT NULL,
            paletizacao VARCHAR(200) NULL DEFAULT NULL,
            tabela VARCHAR(200) NULL DEFAULT NULL,
            ipi DOUBLE NOT NULL,
            val_faturado VARCHAR(200) NOT NULL,
            motivocancelamento LONGTEXT NOT NULL,          
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS pedido_item (
            id_produto INT(11) NOT NULL,
            id_pedido INT(11) NOT NULL,
            qtde FLOAT NOT NULL,
            valor VARCHAR(200) NOT NULL,
            valor_tabela VARCHAR(200) NULL DEFAULT NULL,
            ipi DOUBLE(8,2) NULL DEFAULT NULL,
            diferenca DOUBLE(8,2) NOT NULL DEFAULT 0,          
            comissao DOUBLE(8,2) NULL DEFAULT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL
        )`
    ]
];