import { OfferCreate } from "@src/interfaces/Offer";
import { adminViewAllOfferList, makeOffer } from "@src/services/offerManagementServices";
import { Request, Response } from "express";

export const handleAdminOfferList = async (req: Request, res: Response) => {
  try {
    const result = await adminViewAllOfferList();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleMakeOffer = async (
  req: Request<{}, {}, OfferCreate>,
  res: Response
) => {
//   const bookId = req.body.bookId;
//   const offeredBy = req.body.offeredBy;
//   const offeredTo = req.body.offeredTo;
//   const offerDetails = req.body.offerDetails;
  try {
    if(!req.body.bookId) throw new Error ("bookId is falsy")
        
    const result = await makeOffer(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};
