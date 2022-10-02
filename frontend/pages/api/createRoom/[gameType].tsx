// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";

type Data = {
  userID: number;
  roomID: string;
  userName: string;
  permission: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userName: string = req.body.userName;
  res.status(200).json({
    userID: 1,
    roomID: "angrjk",
    userName: userName,
    permission: "admin",
  });
}
