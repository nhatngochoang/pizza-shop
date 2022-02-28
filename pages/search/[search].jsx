import React, { useCallback, useEffect } from "react"
import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import PizzaCard from "../../components/PizzaCard.jsx"
import styles from "../../styles/PizzaList.module.css";
import { increaseSearch } from "../../redux/searchSlice.js";

const Search = ({ pizzaList }) => {
   // @ts-ignore
   const searchObj = useSelector((state) => state.search)
   // @ts-ignore
   const search = useSelector((state) => state.search.searchFilter)
   // @ts-ignore
   let quantity = useSelector((state) => state.search.quantity)
   const dispatch = useDispatch();
   // console.log(searchObj);

   const [count, setCount] = useState(0)

   const newPizzaList = []
   pizzaList.map((pizza) => {
      const title = pizza.title.toUpperCase();
      if (search) {
         const searchStr = search.toUpperCase()
         const re = new RegExp(`${searchStr}`);
         if (title.search(re) !== -1) {
            // setCount(prev => prev + 1)
            newPizzaList.push(pizza)
         }
      }
   })


   const handleCount = useCallback(() => {

      // const obj = {
      //    quantity: quantity
      // }
      // dispatch(increaseSearch(obj))
      // console.log(obj);
   }, [])

   // const handleCount = useCallback(() => {
   //    setCount(prev => prev + 1)
   //    // dispatch(increaseSearch({ quantity: quantity + 1 }))
   // }, [])

   // const handleCount = useCallback(() => { /*Step 2.1*/
   //    setCount(prev => prev + 1)
   //    console.log('Count: ' + countRef.current)
   // }, [])

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Có <span>{newPizzaList.length}</span> sản phẩm tương ứng</h1>

         <p className={styles.desc}>

         </p>
         <div className={styles.wrapper}>
            {
               newPizzaList.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />
               )
            }
         </div>
      </div>
   );
};

export const getServerSideProps = async () => {
   // const myCookie = ctx.req?.cookies || "";
   // let admin = false;

   // if (myCookie.token === process.env.TOKEN) {
   //    admin = true;
   // }

   const res = await axios.get(`http://localhost:3000/api/products/`);
   return {
      props: {
         pizzaList: res.data,
         // admin,
      },
   };
};


export default Search;
