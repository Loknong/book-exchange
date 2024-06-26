import { OfferCreate } from "@src/interfaces/Offer";
import {
  adminViewAllOfferList,
  getOfferDetail,
  getOfferHistory,
  makeOffer,
  updateOfferStatus,
  viewUserPendingList,
} from "@src/services/offerManagement.services";
import { insertStatusHistory } from "@src/services/util/statusHistory.services";
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
  
  console.log("req.body", req.body);
  try {
    if (!req.body.bookId) throw new Error("bookId is falsy");
    if (!req.body.offeredBy) throw new Error("offeredBy is falsy");
    if (!req.body.offeredTo) throw new Error("offeredTo is falsy");

    const result = await makeOffer(req.body);
    await insertStatusHistory('offers', result.offerDetail.offerId, result.offerDetail.status)
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleViewPendingList = async (
  req: Request<{}, {}>,
  res: Response
) => {
  console.log("Params Userid", req.query.userId);
  const userId = parseInt(req.query.userId as string, 10);
  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing userId query parameter" });
  }
  try {
    const result = await viewUserPendingList(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetOfferDetail = async (
  req: Request<{ offerId: number }>,
  res: Response
) => {
  console.log("Params offerId", req.params.offerId);
  const offerId = req.params.offerId;
  try {
    const result = await getOfferDetail(offerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleUpdateOfferStatus = async (
  req: Request<
    { offerId: number },
    {},
    { status: "ACCEPTED" | "REJECTED" | "COMPLETED" }
  >,
  res: Response
) => {
  console.log("Params offerId", req.params.offerId);
  console.log("Status", req.body.status);
  
  const offerId = req.params.offerId;
  try {
    const result = await updateOfferStatus(offerId, req.body.status);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};

export const handleGetOfferHistory = async (
  req: Request<{ userId: number }>,
  res: Response
) => {
  console.log("req.params", req.params);
  const userId = req.params.userId;
  try {
    const result = await getOfferHistory(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
};
