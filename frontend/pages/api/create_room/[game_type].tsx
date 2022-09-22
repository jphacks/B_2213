// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

type Data = {
  user_id: number;
  room_id: string;
  user_name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user_name: string = req.body.user_name;
  res.status(200).json({
    user_id: 1,
    room_id: "angrjk",
    user_name: user_name,
  });
}
