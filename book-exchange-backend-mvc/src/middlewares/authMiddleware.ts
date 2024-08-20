import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client"; // Import the enum from Prisma

const secretKey = process.env.JWT_SECRET_KEY || "secret";

export interface AuthenticatedUser {
  id: number;
  role: UserRole;
}

export const authMiddleware = (requiredRoles: UserRole[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as {
        user: AuthenticatedUser;
      };

      req.body.user = decoded.user;

      if (requiredRoles.length && !requiredRoles.includes(decoded.user.role)) {
        return res.status(403).json({
          message: `Forbidden: Insufficient role. Required roles: ${requiredRoles.join(
            ", "
          )}`,
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Token has expired" });
      }
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};
