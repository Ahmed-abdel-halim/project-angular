export interface Product {
id: number;
name: string;
description: string;
price: number;
stock_quantity: number;
brand: string;
category_id: number;
image_url: string;
rating: number;
created_at: string;
updated_at: string | null;
quantity?: number;
category_name:string;
cart_item_id?: number;


}


