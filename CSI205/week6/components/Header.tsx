"use client";

import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
  return (
    // header container
    <div className="mt-4 text-center">
      {/*  code  */}
      <div className="flex justify-center gap-4">
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-red-700 text-white rotate-6">
          C
        </Badge>
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-green-800 text-white -rotate-6">
          S
        </Badge>
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-blue-800 text-white rotate-6">
          I
        </Badge>
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-sky-500 text-white -rotate-6">
          2
        </Badge>
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-yellow-500 text-white rotate-6">
          0
        </Badge>
        <Badge className="text-3xl rounded-lg py-1 px-3 bg-gray-500 text-white -rotate-6">
          5
        </Badge>
      </div>

      {/* name */}
      <div className="mt-4 text-center">
        <Badge size="lg">FRONTEND SOFTWARE DEVELOPMENT</Badge>
      </div>
    </div>
  );
}
