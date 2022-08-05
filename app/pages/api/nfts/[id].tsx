import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { id } = req.query;
    console.log(id)
    if (req.method === "GET") {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const result = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/demo/getNFTs?owner=${'0xd80Bb063ed2937b7E413CcfcebA7B31A56dcB7B6'}&withMetadata=true`)
        console.log(result);
        const nfts = await result.json();
        res.status(200).json(nfts);
    } else {
        res.status(400).json({ error: "Bad request" });
    }
};

export default handler;