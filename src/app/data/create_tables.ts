export const CREATE_TABLES = [
    [
        `CREATE TABLE IF NOT EXISTS dashboard (
            id              INT(11)       PRIMARY KEY,
            valor_faturado  DECIMAL(15,2) DEFAULT NULL,
            valor_meta      DECIMAL(15,2) DEFAULT NULL,
            total_clientes  INT(11)       DEFAULT NULL,
            total_positivos INT(11)       DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS clientes_positivados (
            razao_social VARCHAR(200)  DEFAULT NULL,
            cnpj         DECIMAL(15,2) DEFAULT NULL,
            PRIMARY KEY(razao_social, cnpj)
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS clientes_vencidos (
            id_cliente     VARCHAR(200) DEFAULT NULL,
            razao_social   VARCHAR(200) DEFAULT NULL,
            fantasia       VARCHAR(200) DEFAULT NULL,
            email          VARCHAR(200) DEFAULT NULL,
            cep            VARCHAR(200) DEFAULT NULL,
            end            VARCHAR(200) DEFAULT NULL,
            bairro         VARCHAR(200) DEFAULT NULL,
            cidade         VARCHAR(200) DEFAULT NULL,
            ddd            VARCHAR(10)  DEFAULT NULL,
            tel            VARCHAR(200) DEFAULT NULL,
            cnpj           VARCHAR(200) DEFAULT NULL,
            ie             VARCHAR(200) DEFAULT NULL,
            empresa        VARCHAR(200) DEFAULT NULL,
            juros          VARCHAR(200) DEFAULT NULL,
            nota           VARCHAR(200) DEFAULT NULL,
            pedido         VARCHAR(200) DEFAULT NULL,
            status         CHAR(1)      DEFAULT NULL,
            tipo_documento VARCHAR(50)  DEFAULT NULL,
            valor          VARCHAR(200) DEFAULT NULL,
            venc           VARCHAR(200) DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS clientes (
            id_cliente   VARCHAR(200) DEFAULT NULL,
            razao_social VARCHAR(200) DEFAULT NULL,
            fantasia     VARCHAR(200) DEFAULT NULL,
            email        VARCHAR(200) DEFAULT NULL,
            cep          VARCHAR(200) DEFAULT NULL,
            end          VARCHAR(200) DEFAULT NULL,
            bairro       VARCHAR(200) DEFAULT NULL,
            cidade       VARCHAR(200) DEFAULT NULL,
            estado       VARCHAR(200) DEFAULT NULL,
            ddd          VARCHAR(10)  DEFAULT NULL,
            tel          VARCHAR(200) DEFAULT NULL,
            cel          VARCHAR(200) DEFAULT NULL,
            cnpj         VARCHAR(200) DEFAULT NULL,
            ie           VARCHAR(200) DEFAULT NULL,
            grupo        INT(11)      DEFAULT NULL,
            ref1         VARCHAR(200) DEFAULT NULL,
            refnum1      VARCHAR(200) DEFAULT NULL,
            ref2         VARCHAR(200) DEFAULT NULL,
            refnum2      VARCHAR(200) DEFAULT NULL,
            ref3         VARCHAR(200) DEFAULT NULL,
            refnum3      VARCHAR(200) DEFAULT NULL,
            sync         TINYINT(1)   DEFAULT 1
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS labs (
            id_lab VARCHAR(200) DEFAULT NULL,
            nome   VARCHAR(200) DEFAULT NULL,
            status CHAR(1)      DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS produtos (
            id_produto  INT(11)      PRIMARY KEY,
            id_lab      VARCHAR(200) DEFAULT NULL,
            nome        VARCHAR(200) DEFAULT NULL,
            upc         INT(11)      DEFAULT NULL,
            ipi         INT(11)      DEFAULT NULL,
            estoque     BIGINT(20)   DEFAULT NULL,
            valor_01    DOUBLE(8, 2) DEFAULT NULL,
            cod         INT(11)      DEFAULT NULL,
            status      CHAR(1)      DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS pedidos (
            id_pedido          INT(11)      PRIMARY KEY,
            id_prazo           INT(11)      DEFAULT NULL,
            id_tabela          INT(11)      DEFAULT NULL,
            id_cliente         VARCHAR(200) DEFAULT NULL,
            pag_prazo          VARCHAR(200) DEFAULT NULL,
            promo              TEXT         DEFAULT NULL,
            promo_aut_por      VARCHAR(200) DEFAULT NULL,
            promo_data_aut     VARCHAR(200) DEFAULT NULL,
            comentario         TEXT         DEFAULT NULL,
            vendedor           VARCHAR(200) DEFAULT NULL,
            cod_vendedor       VARCHAR(200) DEFAULT NULL,
            cliente            VARCHAR(200) DEFAULT NULL,
            cod_cliente        VARCHAR(200) DEFAULT NULL,
            cnpj               VARCHAR(200) DEFAULT NULL,
            fantasia           VARCHAR(200) DEFAULT NULL,
            ie                 VARCHAR(200) DEFAULT NULL,
            novo               CHAR(1)      DEFAULT NULL,
            email              VARCHAR(200) DEFAULT NULL,
            ddd                VARCHAR(200) DEFAULT NULL,
            tel                VARCHAR(200) DEFAULT NULL,
            cel                VARCHAR(200) DEFAULT NULL,
            cidade             VARCHAR(200) DEFAULT NULL,
            estado             VARCHAR(200) DEFAULT NULL,
            frete              VARCHAR(200) DEFAULT NULL,
            agendamento        VARCHAR(200) DEFAULT NULL,
            paletizacao        VARCHAR(200) DEFAULT NULL,
            compra             VARCHAR(200) DEFAULT NULL,
            total              DOUBLE       DEFAULT NULL,
            ipi                DOUBLE       DEFAULT NULL,
            motivocancelamento LONGTEXT     DEFAULT NULL,
            datas              DATE         DEFAULT NULL,
            status             CHAR(1)      DEFAULT NULL,
            sync               TINYINT(1)   DEFAULT 1
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS pedido_itens (
            id_pedido  INT(11)      DEFAULT NULL,
            id_produto INT(11)      DEFAULT NULL,
            nome       VARCHAR(200) DEFAULT NULL,
            cod        INT(11)      DEFAULT NULL,
            qtde       FLOAT        DEFAULT NULL,
            valor      VARCHAR(200) DEFAULT NULL,
            desconto   VARCHAR(200) DEFAULT NULL,
            ipi        DOUBLE(8,2)  DEFAULT NULL,     
            comissao   DOUBLE(8,2)  DEFAULT NULL,
            faturado   VARCHAR(200) DEFAULT NULL,
            sync       TINYINT(1)   DEFAULT 1
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS prazos (
            id_prazo INT(11)      PRIMARY KEY,
            nome     VARCHAR(200) DEFAULT NULL,
            valor    DOUBLE       DEFAULT NULL,
            status   CHAR(1)      DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS tabelas (
            id_tabela INT(11) PRIMARY KEY,
            descricao VARCHAR(200) DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS labs (
            id_lab VARCHAR(200)  DEFAULT NULL,
            nome   VARCHAR(200)  DEFAULT NULL,
            status CHAR(1)       DEFAULT NULL
        )`
    ],
    [
        `CREATE TABLE IF NOT EXISTS tabelas_produtos (
            id_produto INT(11)     DEFAULT NULL,
            id_tabela  INT(11)     DEFAULT NULL,
            valor      DOUBLE(8,2) DEFAULT NULL,
            upc        INT(11)     DEFAULT NULL,
            estoque    INT(11)     DEFAULT NULL
        )`
    ]
];