import React from "react"
import styles from "../../styles/Product.module.css"
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice.js";

const Product = ({ pizza }) => {
   const [size, setSize] = useState(0);
   const [price, setPrice] = useState(pizza.prices[0]);
   const [extras, setExtras] = useState([])
   const [quantity, setQuantity] = useState(1)

   const [sizeImage, setSizeImage] = useState('/img/size.png')

   const dispatch = useDispatch()

   const changePrice = (number) => {
      setPrice(price + number)
   }

   const changeImge = () => {

   }

   const handleSize = (sizeIndex) => {
      const difference = pizza.prices[sizeIndex] - pizza.prices[size]
      setSize(sizeIndex)

      // setSizeImage(newSizeImage)
      changePrice(difference)
   }

   const handleChange = (e, option) => {
      const checked = e.target.checked
      if (checked) {
         changePrice(option.price)
         setExtras([...extras, option])
         changeImge()
      } else {
         changePrice(-option.price)
         setExtras(extras.filter(extra => extra._id !== option._id))

      }
   }

   const handleClick = () => {
      dispatch(addProduct({ ...pizza, extras, price, quantity }))
   }
   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <div className={styles.imgContainer}>
               <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
            </div>
         </div>
         <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>{price}.000 đ</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}>Chọn size bánh</h3>
            <div className={styles.sizes}>
               <div className={styles.size} onClick={() => handleSize(0)}>
                  <Image src={sizeImage} layout="fill" alt="" />
                  <span className={styles.number}>Small</span>
               </div>
               <div className={styles.size} onClick={() => handleSize(1)}>
                  <Image src={sizeImage} layout="fill" alt="" />
                  <span className={styles.number}>Medium</span>
               </div>
               <div className={styles.size} onClick={() => handleSize(2)}>
                  <Image src={sizeImage} layout="fill" alt="" />
                  <span className={styles.number}>Large</span>
               </div>
            </div>
            <h3 className={styles.choose}>Chọn nguyên liệu bổ sung
            </h3>
            <div className={styles.ingredients}>
               {pizza.extraOptions.map((option) => (
                  <div className={styles.option} key={option._id}>
                     <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className={styles.checkbox}
                        onChange={(event) => handleChange(event, option)}
                     />
                     <label htmlFor="double">{option.text}</label>
                  </div>
               ))}

               {/* <div className={styles.option}>
                  <input
                     className={styles.checkbox}
                     type="checkbox"
                     id="cheese"
                     name="cheese"
                  />
                  <label htmlFor="cheese">Thêm Cheese</label>
               </div>
               <div className={styles.option}>
                  <input
                     className={styles.checkbox}
                     type="checkbox"
                     id="spicy"
                     name="spicy"
                  />
                  <label htmlFor="spicy">Sốt Cay</label>
               </div>
               <div className={styles.option}>
                  <input
                     className={styles.checkbox}
                     type="checkbox"
                     id="garlic"
                     name="garlic"
                  />
                  <label htmlFor="garlic">Sốt Tỏi</label>
               </div> */}
            </div>
            <div className={styles.add}>
               <input
                  onChange={e => setQuantity(Number(e.target.value))}
                  type="number"
                  defaultValue={1}
                  className={styles.quantity}
               />
               <button
                  className={styles.button}
                  onClick={handleClick}
               >Thêm vào Giỏ</button>
            </div>
         </div>
      </div>
   );
};

export const getServerSideProps = async ({ params }) => {
   // const myCookie = ctx.req?.cookies || "";
   // let admin = false;

   // if (myCookie.token === process.env.TOKEN) {
   //    admin = true;
   // }

   const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
   return {
      props: {
         pizza: res.data,
         // admin,
      },
   };
};


export default Product;
