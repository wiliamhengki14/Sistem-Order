import { useEffect, useState, type FormEvent } from "react";
import { filter, tables } from "./CreateOrder.constant";
import Button from "../../ui/Button";
import styles from './CreateOrder.module.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMenu } from "../../services/menu.services";
import type { ICart, IMenu } from "../../types/order";
import { Link } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { createOrder } from "../../services/order.services";

const CreateOrder = () => {
    // menampilkan semua menu
    const [menus, setMenus] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getMenu(searchParams.get('category') as string);
            setMenus(result?.data || []);
        }
        fetchData();
    }, [searchParams.get('category')]);
    // melakukan increment dan decrement cart
    const [carts, setCarts] = useState<ICart[]>([]);
    const handleAddToCart = (type: string, id: string, name: string) => {
        const ItemIsCart = carts.find((item:ICart) => item.menuItemId === id);
        if(type === 'increment') {
            if(ItemIsCart) {
                setCarts(
                    carts.map((item: ICart) => item.menuItemId === id ? {...item, quantity: item.quantity + 1} : item),
                )
            }else {
                setCarts([...carts, {menuItemId: id, name,  quantity: 1}]);
            }
        }else {
            if(ItemIsCart && ItemIsCart.quantity <=1) {
                setCarts(carts.filter((item: ICart) => item.menuItemId !== id));
            }else {
                setCarts(
                    carts.map((item: ICart) => item.menuItemId === id ? {...item, quantity: item.quantity - 1} : item),
                );
            }
        }
    }
    // post order

    const navigate = useNavigate();
    const handleOrder = async (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const payload = {
            customerName: form.customerName.value,
            tableNumber: parseInt(form.tableNumber.value),
            cart: carts.map((item: ICart) => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                notes: '',
            })),
        }
        await createOrder(payload);
        return navigate('/orders');
    }
    return (
        <main className={styles.create}>
            <div className={styles.menu}>
                <h1>Explore Our Best Menu</h1>
                <div className={styles.filter}>
                    {filter.map((filter) => (
                        <Button color={
                            (!searchParams.get('category') && filter === 'All' || filter === searchParams.get('category') ? 'primer' : 'sekunder')}
                        onClick={() => setSearchParams(filter === 'All' ? {} : {category: filter})}>{filter}</Button>
                    ))}
                </div>
                <div className={styles.list}>
                    {menus.map((item: IMenu) => (
                        <div className={styles.item} key={item.id}>
                            <img src={item.image_url} alt={item.name} className={styles.image} />
                            <h2>{item.name}</h2>
                            <div className={styles.buttom}>
                                <h2>${item.price}</h2>
                                <Button onClick={() => handleAddToCart('increment', `${item.id}`, `${item.name}`)}>Add To Cart</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form className={styles.form} onSubmit={handleOrder}>
                <div>
                    <div className={styles.header}>
                        <h3 className={styles.title}>Customer Information</h3>
                        <Link to='/orders'>
                            <Button color="sekunder">Cancel</Button>
                        </Link>
                    </div>
                    <div className={styles.input}>
                        <Input id="name" name="customerName" label="Name" required placeholder="Masukkan Nama Pengguna" />
                        <Select id="table" name="tableNumber" label="Table Number" option={tables} required />
                    </div>
                </div>
                <div>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Customer Order</h2>
                    </div>
                    {carts.length > 0 ? ( 
                    <div className={styles.cart}>
                    {carts.map((item: ICart) => (
                        <div className={styles.item} key={item.menuItemId}>
                            <h4 className={styles.name}>{item.name}</h4>
                            <div className={styles.quantity}>
                                <Button onClick={() => handleAddToCart('decrement', `${item.menuItemId}`, `${item.name}`)} >-</Button>
                                <div className={styles.number}>{item.quantity}</div>
                                <Button onClick={() => handleAddToCart('increment', `${item.menuItemId}`, `${item.name}`)}>+</Button>
                            </div>
                        </div>
                    ))}
                    <Button type="submit">Order</Button>
                    </div>
                    ) : (
                        <div className={styles.cart}>
                            <h4>Is Empty</h4>
                        </div>
                    )}
                </div>
                
            </form>
        </main>
    )
}

export default CreateOrder;