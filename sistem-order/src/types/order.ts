interface IMenu {
    id?: string;
    name: string;
    description?: string;
    price?: number;
    image_url?: string;
    category?: string;
    is_avaliable?: boolean;
}

interface ICart {
    name?: string;
    quantity: number;
    menuItemId: string;
    note?: string;
    menuItem?: IMenu;
}

interface IOrder {
    id: string;
    customer_name: string;
    table_number: number;
    cart: ICart[];
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
    total: number;
}

export type {ICart, IMenu, IOrder};