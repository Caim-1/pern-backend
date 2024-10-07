import jwt from "jsonwebtoken";

const jwtTokens = (id: string, username: string, email: string) => {
  const user = { id, username, email };

  if (process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10m" });

    return { accessToken, refreshToken };
  }

  return null;
};

export default jwtTokens;
