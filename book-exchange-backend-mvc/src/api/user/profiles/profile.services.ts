import {
  PrismaClient,
  Users,
  UserProfilePictures,
  UserAddress,
  Notifications,
} from "@prisma/client";
import { UpdateUserInfo } from "./profile.types";
interface UserProfileOptions {
  details?: boolean;
  withAddress?: "full" | "short";
  withPicture?: boolean;
  roles?: boolean;
  activityLogs?: boolean;
  accountStatus?: boolean;
  transactions?: boolean;
  notifications?: "true" | "test";
}

interface Noti {
  message: string;
  createdAt: string;
}

type Address = {
  id: number;
  userId: number | null; // Allow null here
  houseNumber: string;
  village: string | null;
  street: string | null;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  credit: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictures?: string;
  addresses?: Partial<Address>[];
  notification?: Noti[] | null;
}

// Get User Profile: Retrieving user profile details.
export const getUserProfile = async (
  prisma: PrismaClient,
  userId: number,
  options: UserProfileOptions
): Promise<UserProfileResponse> => {
  console.log("userId", userId);

  const query: any = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    credit: true,
    username: true,
    createdAt: true,
    updatedAt: true,
  };

  if (options.withAddress) {
    query.addresses = {
      select:
        options.withAddress === "full"
          ? {
              houseNumber: true,
              village: true,
              street: true,
              subdistrict: true,
              district: true,
              province: true,
              postalCode: true,
              country: true,
              phoneNumber: true,
            }
          : {
              houseNumber: true,
              district: true,
              province: true,
            },
    };
  }

  const userProfileTemp = await prisma.users.findUnique({
    where: { id: userId },
    select: query,
  });

  console.log("usersssId", options.withPicture);
  
  const tempProfile = options.withPicture
    ? await prisma.userProfilePictures.findFirst({
        where: { userId: userId, isActive: true },
        select: { id: true, name: true },
      })
    : undefined;

    console.log("tempProfile", tempProfile);
    
  if (!userProfileTemp) {
    throw new Error("User not found");
  }

  console.log(userProfileTemp);
  console.log("notiOption", options.notifications);

  const notificationTemp = options.notifications
    ? options.notifications === "test"
      ? [
          { message: "test", createdAt: "1111" },
          { message: "test2", createdAt: "2222" },
        ]
      : options.notifications === "true"
      ? [
          { message: "czxc", createdAt: "1111" },
          { message: "xczxc", createdAt: "2222" },
        ]
      : undefined
    : undefined;
  console.log("notificationTemp", notificationTemp);

  const result: UserProfileResponse = {
    id: Number(userProfileTemp.id),
    firstName: String(userProfileTemp.firstName),
    lastName: String(userProfileTemp.lastName),
    email: String(userProfileTemp.email),
    credit: Number(userProfileTemp.credit),
    username: String(userProfileTemp.username),
    createdAt: userProfileTemp.createdAt as unknown as Date,
    updatedAt: userProfileTemp.updatedAt as unknown as Date,
    profilePictures: tempProfile ? tempProfile.name : undefined,
    addresses: userProfileTemp.addresses
      ? userProfileTemp.addresses
      : undefined,
    notification: notificationTemp ? notificationTemp : undefined,
  };

  return result;
};

// Update User Profile: Updating user profile details.
export const updateUserProfile = async (
  prisma: PrismaClient,
  userId: number,
  data: UpdateUserInfo
) => {
  const updateProfile = prisma.users.update({
    where: { id: userId },
    data,
  });

  return updateProfile;
};

// Add Profile Picture: Adding a profile picture for a user.
export const updateUserProfileImage = async (
  prisma: PrismaClient,
  userId: number,
  profileData: string
) => {
  return prisma.$transaction(async (prismaTransaction) => {
    const userImage = await prismaTransaction.userProfilePictures.create({
      data: {
        userId,
        name: profileData,
        isActive: true,
      },
    });

    console.log(userImage);

    const test = await prismaTransaction.userProfilePictures.updateMany({
      where: { userId: userId, id: { not: userImage.id } },
      data: { isActive: false },
    });
    console.log(test);

    const user = await prismaTransaction.users.update({
      where: { id: userId },
      data: { pictureId: userImage.id },
    });

    return user;
  });
};

// Delete Profile Picture: Deleting a profile picture for a user.
