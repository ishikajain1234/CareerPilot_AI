"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaTachometerAlt, FaQuestionCircle, FaArrowUp, FaInfoCircle } from "react-icons/fa";

const Header = () => {
  const path = usePathname();
  useEffect(() => {});
  
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <div className="flex gap-2">
        <Image src={"/logo.svg"} width={70} height={50} alt="logo" />
        <p className="font-bold text-xl  text-blue-500">CareerPilot-Ai</p>
      </div>

      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path == "/dashboard" && "text-primary font-bold"}
        `}
          >
            <FaTachometerAlt />
            Dashboard
          </li>
        </Link>
        <Link href={"/dashboard/How"}>
          <li
            className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path == "/dashboard/questions" && "text-primary font-bold"}
        `}
          >
            <FaQuestionCircle />
            Interview Questions
          </li>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <li
            className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path == "/dashboard/upgrade" && "text-primary font-bold"}
        `}
          >
            <FaArrowUp />
            Upgrade
          </li>
        </Link>
        <Link href={"/dashboard/questions"}>
          <li
            className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
        ${path == "/dashboard/how" && "text-primary font-bold"}
        `}
          >
            <FaInfoCircle />
            How it Works?
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
