import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import { UpdateUserInfo, UserProfileRequest } from "./profile.types";
import * as services from "./profile.services";

export const handleGetUserInfo = async (
  req: Request<UserProfileRequest>,
  res: Response
) => {
  const userId = Number(req.params.userId);
  console.log("UserProfile", req.query);
  
  const {
    details,
    withAddress,
    withPicture,
    roles,
    activityLogs,
    accountStatus,
    transactions,
    notifications,
  } = req.query;
  try {
    const userProfile = await services.getUserProfile(prisma, userId, {
      details: details === "true",
      withAddress:
        withAddress === "full" || withAddress === "short"
          ? withAddress
          : undefined,
      withPicture: withPicture === "true",
      roles: roles === "true",
      activityLogs: activityLogs === "true",
      accountStatus: accountStatus === "true",
      transactions: transactions === "true",
      notifications:
        notifications === "true" || notifications === "test"
          ? notifications
          : undefined,
    });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

export const handleUpdateProfile = async (
  req: Request<{ userId: number }, {}, UpdateUserInfo>,
  res: Response
) => {
  console.log("Enter Transaciton Create user");
  console.log("Request :", req.body);

  const userId = Number(req.params.userId);
  try {
    const user = await services.updateUserProfile(prisma, userId, req.body);
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};


export const handleUpdatePicture = async (
  req: Request<{}, {}, {userId: number}>,
  res: Response
) => {
  console.log("Enter Transaciton Create user sadsd");
  console.log("Request :", req.body);
  const userId = Number(req.body.userId)
  const profileData = req.file?.filename
  try {
    const user = profileData? await services.updateUserProfileImage(prisma, userId, profileData) : {message: "Images not found"}
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};
