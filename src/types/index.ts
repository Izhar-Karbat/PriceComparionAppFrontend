export interface Product {
  masterproductid: number;
  productname: string;
  brand: string;
  price?: number;
  imageurl?: string;
  producturl?: string;
  storename?: string;
  unitofmeasure?: string;
  quantity?: number;
  healthScore?: number;
}