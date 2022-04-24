// needed Components
import { getRepoes } from "@/api/repo";
import HomePage from "@/components/HomePage/HomePage";
import { convertDate } from "@/helpers/functions";

export default function Home({ data }) {
  return <HomePage {...{ data }} />;
}

export const getStaticProps = async (ctx) => {
  const repoes = await getRepoes(1, 15, convertDate(new Date()));
  return {
    props: {
      data: repoes,
    },
    revalidate: 86400, // so it reValidates the home page every 24 hours since home page Required data is only the Repoes for last 30 days,
  };
};
