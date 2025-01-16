import Image from "next/image";
import { SearchInterface } from "@/components/SearchInterface";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <SearchInterface/>
    </div>
  );
}
