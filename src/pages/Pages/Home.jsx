import AboutUs from "@/components/HomeComponents/AboutUs";
import Banner from "@/components/HomeComponents/Banner";
import ClientReviews from "@/components/HomeComponents/ClientReviews";
import DownloadResources from "@/components/HomeComponents/DownloadResources";
import JoinOurMailingList from "@/components/common/JoinOurMailingList";
import WhatWeOffer from "@/components/HomeComponents/WhatWeOffer";
import React from "react";
import useClient from "@/hooks/useClient";

const Home = () => {
    const { data, isLoading, isError } = useClient({
    queryKey: ["homedata" ],
    url: "/cms/home",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBF3]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-Primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-Secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        {/* <p className="mt-4 text-Third font-bold text-[16px] animate-pulse uppercase tracking-[2px]">Loading Page...</p> */}
      </div>
    );
  }

  const content = data?.data?.content;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Banner data={content?.hero} />
      <AboutUs data={content?.about} />
      <WhatWeOffer data={content?.services} />
      <ClientReviews data={content?.testimonials} />
      <JoinOurMailingList data={content?.newsletter} />
      <DownloadResources data={content?.resources} />
    </div>
  );
};

export default Home;
