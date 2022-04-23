import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      const form = formidable({
        multiples: true,
        filter: ({ mimetype }) => {
          // keep only images
          const starts = mimetype?.startsWith("image");
          return starts ?? false;
        },
      });

      form.parse(req, (err, _fields, files) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        if (!files || !files.file) {
          return res.status(400).json({
            error: "No file uploaded or file is not an image",
          });
        }

        // I ensure that it's an array, if not it will not have the filepath property
        const image = Array.isArray(files.file) ? files.file : [files.file];

        cloudinary.uploader.upload(image[0].filepath, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err.message,
            });
          }

          return res.status(200).json({
            url: result?.secure_url,
          });
        });
      });
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
