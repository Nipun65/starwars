"use client";

import React, { useEffect, useState } from "react";
import Card from "@/app/Components/Card";
import { fetchChars } from "@/app/services";
import { usePathname, useRouter } from "next/navigation";
import Pagination from "@/app/Components/Pagination";
import CharDetailsModal from "@/app/Components/CharDetailsModal";
import Loader from "@/app/Components/Loader";
import { IMAGES } from "@/app/utils/constants.utils";

const Characters = () => {
  const [data, setData] = useState<any>({});
  const [activeModalData, setActiveModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const path = usePathname();
  const splitValue = path.split("/");
  const router = useRouter();

  const fetchData = async () => {
    setShowLoader(true);
    const value = await fetchChars(currentPage);
    setData(() => {
      return {
        ...value?.data,
        results: value?.data?.results?.map((char: any, index: number) => {
          return {
            ...char,
            image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
            id: index + 1,
          };
        }),
      };
    });
    setShowLoader(false);
  };

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(splitValue[2])
  );

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleChange = (value: any) => {
    router.push(`/characters/${value}`);
    setCurrentPage(parseInt(value));
  };

  return (
    <>
      <div className="flex items-center justify-center p-6 bg-black">
        <div className="flex flex-col gap-12 items-center justify-center">
          {!showLoader && data?.results?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
              {data?.results?.map((char: any) => {
                return (
                  <Card
                    data={char}
                    key={char?.id}
                    setActiveModalData={setActiveModalData}
                    setShowModal={setShowModal}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-screen flex items-center justify-center">
              <Loader />
            </div>
          )}
          <Pagination
            totalCount={data?.count}
            perPageContent={10}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </div>
      </div>
      {showModal && (
        <CharDetailsModal data={activeModalData} setshowModal={setShowModal} />
      )}
    </>
  );
};
export default Characters;
