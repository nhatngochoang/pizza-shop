import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import Featured from '../components/Featured.jsx'
import PizzaList from '../components/PizzaList.jsx'
import Add from '../components/Add.jsx'
import styles from '../styles/Home.module.css'
import axios from "axios"
import mongoose from 'mongoose'
import 'bootstrap/dist/css/bootstrap.css'
import AddButton from '../components/AddButton.jsx'



export default function Home({ pizzaList, admin }) {
   const [close, setClose] = useState(true)
   return (
      <div className={styles.container}>
         <Head>
            <title>Pizza 4P&apos;s | Delivering Wow, Sharing Happiness</title>
            <meta name="description" content="Best Pizza in Hanoi" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Featured />
         <div id="product-list" style={{ height: '125px' }}></div>
         {admin && <AddButton setClose={setClose} />}
         {!close && <Add setClose={setClose} />}
         <PizzaList pizzaList={pizzaList} />
      </div>
   )
}

export const getServerSideProps = async (ctx) => {
   const myCookie = ctx.req?.cookies || "";
   let admin = false;

   if (myCookie.token === process.env.TOKEN) {
      admin = true;
   }

   const res = await axios.get("http://localhost:3000/api/products");
   return {
      props: {
         pizzaList: res.data,
         admin
      },
   };
};