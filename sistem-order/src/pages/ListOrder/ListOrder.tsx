import styles from './ListOrder.module.css'
import Button from '../../ui/Button'
const ListOrder = () => {
    return (
        <main className={styles.order}>
            <section className={styles.header}>
                <h1 className={styles.title}>List Order</h1>
                <div className={styles.button}>
                    <Button>Create Order</Button>
                <Button color='sekunder'>Logout</Button>
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
                        <tr>
                            <td>1</td>
                            <td>Wili</td>
                            <td>1</td>
                            <td>10.000</td>
                            <td>COMPLETED</td>
                            <td className={styles.action}>
                                <Button>Detail</Button>
                                <Button>Completed</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default ListOrder;