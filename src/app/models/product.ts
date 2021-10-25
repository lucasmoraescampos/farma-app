export interface Product {
    id: number;
    lab_id: number;
    name: string;
    qty: number;
    packaging_type: 'CX' | 'UN';
    upc: number;
    price: number;
    ipi: number;
    commission: number;
    discount: number;
    total: number;
}