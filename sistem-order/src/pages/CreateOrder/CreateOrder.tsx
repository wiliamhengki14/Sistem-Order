import { useEffect, useState } from "react";
import { filter } from "./CreateOrder.constant";
import Button from "../../ui/Button";
import styles from './CreateOrder.module.css'
import { useSearchParams } from "react-router-dom";
import { getMenu } from "../../services/menu.services";
import type { IMenu } from "../../types/order";
const CreateOrder = () => {
    const [menus, setMenus] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetcOrder = async () => {
            const result = await getMenu(searchParams.get('category') as string);
            setMenus(result?.data || []);
        }
        fetcOrder();
    }, [searchParams.get('category')]);
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
                                <Button>Add To Cart</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </main>
    )
}

export default CreateOrder;