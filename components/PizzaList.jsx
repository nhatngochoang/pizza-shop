import React from "react"
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({ pizzaList }) => {
   return (
      <div className={styles.container} >
         <h1 className={styles.title}>Khuyến Mãi Đặc Biệt</h1>

         <p className={styles.desc}>
            Với mỗi hóa đơn có sản phẩm thuộc chương trình khuyến mại Giảm 50% Pizza thứ hai, phụ thu phí giao hàng 25,000VND/đơn khi đặt hàng.
         </p>
         <div className={styles.wrapper}>
            {pizzaList.map((pizza) => (
               <PizzaCard key={pizza._id} pizza={pizza} />
            ))}
         </div>
      </div>
   );
};

export default PizzaList;
