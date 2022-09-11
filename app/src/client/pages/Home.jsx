import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import "../components/scss/navBar.scss";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="_3-col-imgs">
        <img src="../110-e1658840911800.jpg" alt="" />
        <img src="../100-e1658840863133.jpg" alt="" />
        <img src="../90-e1658840931456.jpg" alt="" />
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Slider />
      </motion.div>
      <div className="_2-col-imgs">
        <img
          src="https://monrituel.ma/wp-content/uploads/2022/08/1-7.png"
          alt=""
        />
        <img
          src="https://monrituel.ma/wp-content/uploads/2022/08/2-10.png"
          alt=""
        />
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Slider />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
