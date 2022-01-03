import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Admin.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Bookmark from "../../components/Bookmark.component";
import Banner from "../../components/Banner.component";
import Header from "../../components/Header.component";
import Button from "../../components/Button.component";
import Modal from "../../components/Modal.component";
import BookmarkForm from "../../components/BookmarkForm";
import Article from "../../components/Article.component";
import BookmarkList from "../../components/BookmarkList.component";
import ArticleList from "../../components/ArticleList.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaceholderItem from "../../components/PlaceholderItem";

interface Attributes {
  url: string;
  description?: string;
  cover_url?: string;
  content?: string;
  title?: string;
}
interface BookmarksResponse {
  id: number;
  attributes: Attributes;
}

const AdminPage: NextPage = () => {
  const url = "http://api.digitalbytes.com:1337/api";
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <Banner label="You are viewing this page as an admin"></Banner>
        
        <div className="flex justify-between">
        <Header />
        <div className={styles.actions + " mt-12 invisible md:visible lg:visible xl:visible sm:visible"}>
            <Button priority="outline">Edit Settings</Button>
            <ToastContainer />
          </div>
        </div>

        <div className="container mt-4mx-auto">

        </div>
        {showModal && (
          <Modal handleClose={toggleModal}>
            <BookmarkForm></BookmarkForm>
          </Modal>
        )}
        <div className="mt-4 grid lg:grid-cols-3 sm:grid-cols-1 sm:gap-1 gap-4">
          <PlaceholderItem onClick={toggleModal}></PlaceholderItem>
          <BookmarkList isAdmin={true}></BookmarkList>
          <ArticleList isAdmin={true}></ArticleList>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
