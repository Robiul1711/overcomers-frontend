import React from 'react';

const resources = [
  {
    id: 1,
    title: "Dispelling ABA Myths (Dillenburger\n& Keenan, 2009) (pdf)",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "ABA on autism (Foxx,\n2008) (pdf)",
    fileUrl: "#",
  }
];

const DownloadResources = () => {
  return (
    <div className="w-full bg-[#FAFAFA] section-padding-x py-20 md:py-28 flex justify-center items-center">
      <div className="max-w-[1440px] w-full flex flex-col md:flex-row justify-center gap-8 md:gap-12 lg:gap-16">
        
        {resources.map((resource) => (
          <div 
            key={resource.id} 
            className="bg-white rounded-[16px] p-10 md:p-14 w-full md:w-1/2 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          >
            <h3 className="text-Secondary font-bold text-[18px] md:text-[20px] leading-[1.5] mb-8 min-h-[60px] whitespace-pre-line">
              {resource.title}
            </h3>
            
            <a 
              href={resource.fileUrl}
              download
              className="bg-Primary hover:bg-Primary/90 text-Third font-bold text-[14px] px-8 py-3 rounded-[8px] transition-colors shadow-sm mb-4 inline-flex items-center justify-center cursor-pointer"
            >
              Download
            </a>
            
            <p className="text-gray-400 text-[13px]">
              Click on a file to download.
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DownloadResources;
