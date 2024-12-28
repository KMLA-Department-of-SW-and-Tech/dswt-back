import type { NextFunction, Request, Response } from "express"
import admin from "../services/firebase"

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) {
    res.status(401).json({ message: "인증되지 않은 사용자입니다." })
    return
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken.uid
    next()
  } catch (error) {
    next(error)
  }
}

export default authenticateToken
