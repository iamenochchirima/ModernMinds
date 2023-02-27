import cookie from "cookie";
import { API_URL } from "../../../config/index";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const apiRes = await axios.post(`${API_URL}/api/token/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = apiRes.data;

      const accessToken = jwtDecode(data.access);
      const refreshToken = jwtDecode(data.refresh);

      const accessTokenMaxAge = accessToken.exp - Math.floor(Date.now() / 1000);
      const refreshTokenMaxAge = refreshToken.exp - Math.floor(Date.now() / 1000);

      console.log(accessTokenMaxAge, "here")
      console.log(refreshTokenMaxAge, "here")

      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: accessTokenMaxAge,
            sameSite: "strict",
            path: "/api/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: refreshTokenMaxAge,
            sameSite: "strict",
            path: "/api/",
          }),
        ]);

        return res.status(200).json({
          success: "Logged in successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        err,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }
};
