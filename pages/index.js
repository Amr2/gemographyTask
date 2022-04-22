import { getRepoes } from "@/api/repo";
import { convertDate } from "@/helpers/functions";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const repos = getRepoes(1, 5, convertDate(new Date()));
  console.log(repos);
  return <div>test</div>;
}
