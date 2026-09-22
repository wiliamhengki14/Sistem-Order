import { useEffect, useState } from "react";
import type{ ICart, IOrder } from "../../types/order";
import { getOrderId } from "../../services/order.services";
import { useParams } from "react-router-dom";
import styles from './DetailOrder.module.css'
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
const DetailOrder = () => {
    const {id} = useParams(); // mengambil sebuah parameter yaitu id
    const [order, setOrder] = useState<IOrder | null> (null);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderId(`${id}`);
            setOrder(result);
        };
        fetchData();
    }, []); 
    return (
        <main className={styles.detail}>
            <section className={styles.header}>
                <h1>Detail Order</h1>
                <Link to='/orders'>
                    <Button>Back</Button>
                </Link>
            </section>
            <section className={styles.order}>
                <div className={styles.info}>
                    <div className={styles.item}>
                        <p>ORDER ID:</p>
                        <h4>{order?.id}</h4>
                    </div>
                    <div className={styles.item}>
                        <p>Customer:</p>
                        <h4>{order?.customer_name}</h4>
                    </div>
                    <div className={styles.item}>
                        <p>Table:</p>
                        <h4>{order?.table_number}</h4>
                    </div>
                    <div className={styles.item}>
                        <p>Status:</p>
                        <h4>{order?.status}</h4>
                    </div>
                    <div className={styles.item}>
                        <p>Total:</p>
                        <h4>{order?.total}</h4>
                    </div>
                </div>
                <div className={styles.cart}>
                    <h3>Order Items</h3>
                    <div className={styles.list}>
                        {order?.cart.map((list: ICart) => (
                            <div className={styles.item1} key={list.menuItemId}>
                                <img src={list?.menuItem?.image_url} alt={list.name} className={styles.image}/>
                                <div>
                                    <p className={styles.name}>{list.quantity} x {list.menuItem?.name}</p>
                                    <p className={styles.price}>${parseInt(`${list.menuItem?.price}`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DetailOrder;