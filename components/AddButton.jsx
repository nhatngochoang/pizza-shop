import React from "react";
import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
   return (
      <div
         onClick={() => setClose(false)}
         className={styles.mainAddButton}>
         Thêm Pizza mới
      </div>
   )
}

export default AddButton
