"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaTachometerAlt, FaQuestionCircle, FaArrowUp, FaInfoCircle } from "react-icons/fa";

const AppHeader = ({hideSidebar=false}) => {
  const path = usePathname();
  useEffect(() => {});

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-xlg">
      {/* Centered menu container */}
      <div className="flex-1 flex justify-center">
        <ul className="hidden md:flex gap-6">
          <Link href={"/dashboard"}>
            <li
              className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path == "/dashboard" && "text-primary font-bold"}`}
            >
              <FaTachometerAlt />
              Dashboard
            </li>
          </Link>
          <Link href={"/dashboard/How"}>
            <li
              className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path == "/dashboard/questions" && "text-primary font-bold"}`}
            >
              <FaQuestionCircle />
              Questions
            </li>
          </Link>
          <Link href={"/dashboard/upgrade"}>
            <li
              className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path == "/dashboard/upgrade" && "text-primary font-bold"}`}
            >
              <FaArrowUp />
              Upgrade
            </li>
          </Link>
          <Link href={"/dashboard/questions"}>
            <li
              className={`flex items-center gap-2 hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path == "/dashboard/how" && "text-primary font-bold"}`}
            >
              <FaInfoCircle />
              How it Works?
            </li>
          </Link>
        </ul>
      </div>

      {/* UserButton aligned right */}
      <UserButton />
    </div>
  );
};

export default AppHeader;
