"use client";

import Link from "next/link";

import { Facebook, Instagram, Twitter } from "@tailgrids/icons";
import { Badge } from "./tailgrids/core/badge";

export default function Footer() {
  return (
    // footer container
    <>
      <div className="text-center justify-center mt-4 items-center">
        {/* stydent */}
        <div>
          <Badge className="text-xl text-black rounded-lg">
            {" "}
            68045661 ธนากร คำวิเศษ
          </Badge>
        </div>
        {/* contacts */}
        <div className="flex justify-center gap-6 mt-4">
          <Link href={"https://www.facebook.com/thanakon.khamwiset/"} target="_blank">
            <Facebook className="text-blue-700 " />
          </Link>
          <div className="border-l-1"></div>
          <Link href="https://www.instagram.com/midjustttt/" target="_blank">
            <Instagram className="text-pink-700 " />
          </Link>
        </div>
      </div>
    </>
  );
}
