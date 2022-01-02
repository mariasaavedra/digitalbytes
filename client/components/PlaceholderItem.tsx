import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/components/PlaceholderItem.module.scss";

export default function PlaceholderItem() {
  return (
    <>
      <div
        className={
          styles.BookmarkComponent +
          " p-2 bg-white border-8 border-dashed border-black rounded-lg"
        }
        style={{
          height: "300px",
        }}
      >
        <div>
          <div className="text-black">
            <img style={{paddingTop: '20%'}} className="block mx-auto text-center" width="100px" src="/images/create.png"/>
          </div>
        </div>
      </div>
    </>
  );
}
