import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      console.log(process.env.CLOUDINARY_URL);
      const form = formidable({
        multiples: true,
      });

      form.parse(req, (err, _fields, files) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        // I ensure that it's an array, if not it will not have the filepath property
        const image = Array.isArray(files.file) ? files.file : [files.file];

        cloudinary.uploader.upload(image[0].filepath, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          return res.status(200).json({
            message: "File uploaded",
            result,
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
