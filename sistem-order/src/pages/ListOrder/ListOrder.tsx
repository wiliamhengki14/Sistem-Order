import styles from './ListOrder.module.css'
import Button from '../../ui/Button'
import { useEffect, useState } from 'react'
import { getOrders, updateOrder } from '../../services/order.services';
import type { IOrder } from '../../types/order';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '../../utils/storage';
import { Link } from 'react-router-dom';
const ListOrder = () => {
    const [orders, setOrders] = useState([]); // Menampung data dari backend
    const [refetchOrder, setRefetchOrder] = useState(true); // Update Data terbaru

    useEffect(() => {
        if(refetchOrder) {
            const fetchData = async () => {
                const result = await getOrders();
                setOrders(result?.data || []);
            };
            fetchData();
            setRefetchOrder(false);
        }
    }, [refetchOrder]);

    const handleComplete = async (id: string) => {
        await updateOrder(id, {status: 'COMPLETED'}).then(() => {
            setRefetchOrder(true);
        });
    }
    const navigate = useNavigate();
    const handleLogout = () => {
        removeLocalStorage('auth');
        return navigate('/login');
    }
    return (
        <main className={styles.order}>
            <section className={styles.header}>
                <h1 className={styles.title}>List Order</h1>
                <div className={styles.button}>
                    <Button>Create Order</Button>
                    <Button color='sekunder' onClick={handleLogout}>Logout</Button>
                </div>
                
            </section>
            <section>
                <table 
                    className={styles.table}
                    border={1}
                    cellSpacing={0}
                    cellPadding={10}
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Customer Table</th>
                            <th>Table</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item: IOrder, index: number) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.customer_name}</td>
                                <td>{item.table_number}</td>
                                <td>{item.total}</td>
                                <td>{item.status}</td>
                                <td className={styles.action}>
                                    <Link to={`${item.id}`}>
                                        <Button>Detail</Button>
                                    </Link>
                                    {item.status === 'PROCESSING' && <Button onClick={() => handleComplete(item.id)}>Completed</Button>}
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default ListOrder;