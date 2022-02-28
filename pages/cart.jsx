import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useRef } from "react";
import {
   PayPalScriptProvider,
   PayPalButtons,
   usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";

import React from "react";
import OrderDetail from "../components/OrderDetail";


function Cart() {
   // @ts-ignore
   const cart = useSelector((state) => state.cart);
   const [open, setOpen] = useState(false);
   const [cash, setCash] = useState(false);

   const payPalButtonRef = useRef()
   const usdToVND = 22.69
   // const amount = (Number(cart.total) / 22.69).toString()
   var amount = Number(cart.total / usdToVND).toFixed(2)

   const currency = "USD";
   const style = { layout: "vertical" };
   const dispatch = useDispatch();
   const router = useRouter();

   console.log('Local-render');

   let toggled = useRef(false);

   const handleToggleBody = () => {
      toggled.current = !toggled.current;
      console.log(toggled.current);
      setOpen(toggled.current)
   }

   const createOrder = async (data) => {
      try {
         const res = await axios.post("http://localhost:3000/api/orders", data);
         if (res.status === 201) {
            dispatch(reset());
            router.push(`/orders/${res.data._id}`);
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleClose = useCallback(() => {
      console.log('Function-render');
      setCash(false);
   }, [])

   const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

      useEffect(() => {
         dispatch({
            type: "resetOptions",
            value: {
               ...options,
               currency: currency,
            },
         });
      }, [dispatch, options, currency]);



      return (<>
         {(showSpinner && isPending) && <div className="spinner" />}
         <PayPalButtons
            // @ts-ignore
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
               return actions.order
                  .create({
                     purchase_units: [
                        {
                           amount: {
                              currency_code: currency,
                              value: amount,
                           },
                        },
                     ],
                  })
                  .then((orderId) => {
                     // Your code here after create the order
                     return orderId;
                  });
            }}
            onApprove={function (data, actions) {
               return actions.order.capture().then(function (details) {
                  // Your code here after capture the order
                  const shipping = details.purchase_units[0].shipping;
                  createOrder({
                     customer: shipping.name.full_name,
                     address: shipping.address.address_line_1,
                     total: cart.total,
                     method: 1,
                  });
               });
            }}
         />
      </>
      );
   }


   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <table className={styles.table}>
               <tbody>
                  <tr className={styles.trTitle}>
                     <th>Sản phẩm</th>
                     <th>Tên</th>
                     <th>Thêm</th>
                     <th>Giá</th>
                     <th>Số lượng</th>
                     <th>Tổng tiền</th>
                  </tr>
               </tbody>
               <tbody>

                  {cart.products.map((product) => {
                     return (
                        <tr className={styles.tr} key={product.id}>
                           <td>
                              <div className={styles.imgContainer}>
                                 <Image
                                    src={product.img}
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                    className={styles.imgItem}
                                 />
                              </div>
                           </td>
                           <td>
                              <span className={styles.name}>{product.title}</span>
                           </td>
                           <td>
                              <span className={styles.extras}>
                                 {product.extras.map((extra) => (
                                    <div key={extra._id}>{extra.text}</div>
                                 ))}
                              </span>
                           </td>
                           <td>
                              <span className={styles.price}>{product.price}.000 đ</span>
                           </td>
                           <td>
                              <span className={styles.quantity}>{product.quantity}</span>
                           </td>
                           <td>
                              <span className={styles.total}>{product.quantity * product.price}.000 đ</span>
                           </td>
                        </tr>)
                  })}
               </tbody>
            </table>
         </div>
         <div className={styles.right}>
            <div className={styles.wrapper}>
               <h2 className={styles.title}>THÀNH TIỀN</h2>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Tạm tính:</b>{cart.total}.000 đ
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Giảm giá:</b>0 đ
               </div>
               <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Tổng:</b>{cart.total}.000 đ
               </div>

               {toggled.current ? (
                  <div className={styles.paymentMethods}>
                     <button
                        onClick={() => setCash(true)}
                        className={styles.payButton} >THANH TOÁN KHI NHẬN HÀNG
                     </button>

                     <PayPalScriptProvider
                        options={{
                           "client-id": "AVNesOwqXbzxJfeHgYkcjfu9aQ9CIguJvHGBwCAS7T2F4akkx6WyEB107d6ZB0KGG0RamQYbmxqFZRIQ",
                           components: "buttons",
                           currency: "USD",
                           "disable-funding": "credit,card,p24",
                        }}>
                        <div style={{ height: "35px" }}>
                           <ButtonWrapper
                              currency={currency}
                              showSpinner={false}
                           />
                        </div>
                     </PayPalScriptProvider>
                  </div>
               ) : (
                  <button
                     // onClick={() => setOpen(!open)}
                     onClick={handleToggleBody}
                     className={styles.button}>THANH TOÁN NGAY!</button>
               )}

            </div>
         </div>
         {cash && <OrderDetail
            total={cart.total}
            createOrder={createOrder}
            onClose={() => setCash(false)}
         // onClose={handleClose}
         />}
      </div>
   );
}

export default Cart
