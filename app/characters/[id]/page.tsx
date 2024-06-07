"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchChars } from "@/app/services";
import { IMAGES } from "@/app/utils/constants.utils";
import { Character, CharacterResponse } from "@/app/Interfaces";
import Card from "@/app/Components/Card";
import Pagination from "@/app/Components/Pagination";
import CharDetailsModal from "@/app/Components/CharDetailsModal";
import Loader from "@/app/Components/Loader";
import Header from "@/app/Components/Header";
import Layout from "@/app/Components/Layout";

const Characters = () => {
  const [data, setData] = useState<CharacterResponse>();
  const [activeModalData, setActiveModalData] = useState<Character>();
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const path = usePathname();
  const splitValue = path.split("/");
  const router = useRouter();

  const fetchData = async () => {
    setShowLoader(true);
    try {
      const value: any = await fetchChars(currentPage);
      setData(() => {
        return {
          ...value?.data,
          results: value?.data?.results?.map(
            (char: Character, index: number) => {
              return {
                ...char,
                image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
                id: index + 1,
              };
            }
          ),
        };
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setShowLoader(false);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(splitValue[2])
  );

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleChange = (value: number) => {
    router.push(`/characters/${value}`);
    setCurrentPage(value);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center xs:p-2 md:p-4 lg:p-6 bg-black">
        <div className="flex flex-col gap-12 items-center justify-center">
          {!showLoader && data && data?.results?.length > 0 ? (
            <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              {data?.results?.map((char: Character) => {
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
          ) : showLoader ? (
            <div className="flex items-center justify-center h-screen">
              <Loader />
            </div>
          ) : (
            <div className="text-center text-4xl">No Data Found</div>
          )}
          <Pagination
            totalCount={data?.count || 0}
            perPageContent={10}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </div>
      </div>
      {showModal && (
        <CharDetailsModal data={activeModalData} setShowModal={setShowModal} />
      )}
    </Layout>
  );
};
export default Characters;
