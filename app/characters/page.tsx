"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Characters = () => {
  const value = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (value === "/characters") {
      router.push("/characters/1");
    }
  }, []);

  return <></>;
};

export default Characters;
