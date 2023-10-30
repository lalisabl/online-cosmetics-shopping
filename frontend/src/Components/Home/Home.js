import React from "react";
import "./Home.css";
import Header from "../Header/Header";
import Login from "../../login";
import HomeCard from "./HomeCard";
export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="home-body">
        <div className="home-img">
          <img src="image/Wubit.png" alt="wubit" />
        </div>
        <div className="home-login">
          <div className="logiin">
            <Login />
          </div>
        </div>
      </div>
      <div className="homeCard">
        <HomeCard />
      </div>
    </div>
  );
}
