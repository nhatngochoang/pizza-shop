import styles from "../styles/Navbar.module.css"
import Image from "next/image"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import axios from "axios"
import { useState } from 'react'
import { setSearch } from "../redux/searchSlice.js";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const [searchFilter, setSearchFilter] = useState('')
   // @ts-ignore
   const quantity = useSelector((state) => state.cart.quantity)
   // const search = useSelector((state) => state.search.searchFilter)
   const dispatch = useDispatch();
   // const navigate = useNavigate();

   const handleSearchClick = (e) => {
      // e.preventDefault();
      const search = {
         searchString: searchFilter
      }
      dispatch(setSearch(search));
      setSearchFilter('')
      // if (searchFilter.trim()) {
      //    navigate(`/search?q=${encodeURIComponent(searchFilter.trim())}`);
      // }
   }

   return (
      <div className={styles.container}>
         <div className={styles.item}>
            <div className={styles.callButton}>
               <Image src="/img/telephone.png" alt="" width="32" height="32" />
            </div>
            <div className={styles.texts}>
               <div className={styles.text}>Đặt ngay!</div>
               <div className={styles.text}>349 888 102</div>
            </div>
         </div>
         <div className={styles.item}>
            <ul className={styles.list}>
               <Link href="/" passHref>
                  <li className={styles.listItem}>Trang chủ</li>
               </Link>
               <li className={styles.listItem}><a style={{ textDecoration: 'none', color: 'white' }} >Sản phẩm</a></li>
               <li className={styles.listItem}><a style={{ textDecoration: 'none', color: 'white' }} >Giới thiệu</a></li>
               <Image src="/img/logo.webp" alt="" width="110px" height="69px" />
               {/* <li className={styles.listItem}>Events</li>
               <li className={styles.listItem}>Blog</li>
               <li className={styles.listItem}>Liên hệ</li> */}
               <li className={styles.listItem}>
                  <div className="input-group">
                     <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Nhập tên pizza..." aria-describedby="button-addon2" style={{ marginRight: '1px!important' }}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        value={searchFilter}
                     />
                     <Link href={`/search/search?q=${(searchFilter.trim())}`} passHref >
                        <button
                           className="btn btn-outline-secondary ml-2"
                           type="button" id="button-addon2"
                           onClick={handleSearchClick}
                        >
                           Tìm
                        </button>
                     </Link>
                  </div>
               </li>
            </ul>
         </div>
         <Link href="/cart" passHref>
            <div className={styles.item}>
               <div className={styles.cart}>
                  <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                  <div className={styles.counter}>{quantity}</div>
               </div>
            </div>
         </Link>

      </div>
   )
}

export default Navbar
