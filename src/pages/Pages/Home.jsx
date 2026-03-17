import AboutUs from "@/components/HomeComponents/AboutUs";
import Banner from "@/components/HomeComponents/Banner";
import ClientReviews from "@/components/HomeComponents/ClientReviews";
import DownloadResources from "@/components/HomeComponents/DownloadResources";
import JoinOurMailingList from "@/components/HomeComponents/JoinOurMailingList";
import WhatWeOffer from "@/components/HomeComponents/WhatWeOffer";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Banner />
      <AboutUs />
      <WhatWeOffer />
      <ClientReviews />
      <JoinOurMailingList />
      <DownloadResources />
    </div>
  );
};

export default Home;
