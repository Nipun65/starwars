"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    redirect("/characters/1");
  }, []);

  return <></>;
}
