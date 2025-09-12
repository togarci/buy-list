export interface buyItem {
  id?: string | number;
  price: number;
  totalPrice: number;
  quantity: number;
  checked: boolean;
  product: {
    image?: string | null;
    name: string;
    category: string;
    subCategory?: string;
    type: string;
    shortType: string;
  };
}

export interface dataList {
  id?: string;
  name?: string;
  data: buyItem[];
}
