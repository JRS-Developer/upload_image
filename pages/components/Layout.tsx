import Head from "next/head";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  image: string;
}

export default function Layout({ children, image }: Props) {
  image = "https://" + process.env.NEXT_PUBLIC_VERCEL_URL + image; // This way I can use the image in the layout
  return (
    <>
      <Head>
        <title>Upload Image</title>

        <meta name="title" content="Upload your image" key="title" />
        <meta
          name="description"
          content="A simple image uploader"
          key="description"
        />

        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:url"
          content="https://upload-image-omega.vercel.app/"
          key="og:url"
        />
        <meta property="og:title" content="Upload your image" key="og:title" />
        <meta
          property="og:description"
          content="A simple image uploader"
          key="og:description"
        />
        <meta property="og:image" content={image} key="og:image" />

        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta
          property="twitter:url"
          content="https://upload-image-omega.vercel.app/"
          key="twitter:url"
        />
        <meta
          property="twitter:title"
          content="Upload your image"
          key="twitter:title"
        />
        <meta
          property="twitter:description"
          content="A simple image uploader"
          key="twitter:description"
        />
        <meta property="twitter:image" content={image} key="twitter:image" />
      </Head>
      <main>{children}</main>
      <footer className="text-center text-xs text-gray-2 p-4">
        Challenge by{" "}
        <Link href="https://devchallenges.io/">
          <a className="underline" target="_blank">
            devChallenges
          </a>
        </Link>
        <br />
        Coded by{" "}
        <Link href="https://github.com/JRS-Developer/">
          <a className="underline" target="_blank">
            Jose Sanchez | JRS-Developer
          </a>
        </Link>
      </footer>
    </>
  );
}
