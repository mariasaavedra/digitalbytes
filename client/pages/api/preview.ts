// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: string
}
type PreviewData = {
  status: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    //console.log(req);
    res.status(200).json({ status: 'OK' })
  } else {

  }
  res.status(200).json({ status: 'OK' })
}
