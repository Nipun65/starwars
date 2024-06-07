"use client";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

const Characters = () => {
  const value = usePathname();

  useEffect(() => {
    if (value === "/characters") {
      redirect("/characters/1");
    }
  }, []);

  return <></>;
};

export default Characters;
