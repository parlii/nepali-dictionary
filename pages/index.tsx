import Dictionary from "../components/Dictionary";
import Layout from "../components/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl mb-4">Nepali Dictionary</h1>
          <Dictionary />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
