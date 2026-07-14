import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Request } from "express";
import { Env } from "./env.config";
import { findByIdUserService } from "../services/user.service";
import { UnAuthorizedException } from "../utils/appError";

interface JwtPayload {
  userId: string;
}

const options:StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: Request) => {
        const token = req.cookies.accessToken;
        if (!token) throw new UnAuthorizedException("Unauthorized access");
        return token;
    }
  ]),
  secretOrKey: Env.JWT_SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(
    options,
    async ({ userId }: JwtPayload, done) => {
      try {
        const user = await findByIdUserService(userId);

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export const passportAuthenticateJwt =
  passport.authenticate("jwt", {
    session: false,
  });