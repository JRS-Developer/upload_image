import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Upload Image</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
