import cookie from "cookie";
import { API_URL } from "../../../config/index";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    let access = cookies.access ?? false;
    const refresh = cookies.refresh ?? false;

    // check if access token is available
    if (access === false) {
      if (refresh !== false) {
        try {
          const body = JSON.stringify({
            refresh,
          });

          const apiRefreshRes = await axios.post(
            `${API_URL}/api/token/refresh/`,
            body,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const refreshData = await apiRefreshRes.data;

          if (apiRefreshRes.status === 200) {
            const accessToken = jwtDecode(refreshData.access);
            const refreshToken = jwtDecode(refreshData.refresh);

            const accessTokenMaxAge =
              accessToken.exp - Math.floor(Date.now() / 1000);
            const refreshTokenMaxAge =
              refreshToken.exp - Math.floor(Date.now() / 1000);

            res.setHeader("Set-Cookie", [
              cookie.serialize("access", refreshData.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                maxAge: accessTokenMaxAge,
                sameSite: "strict",
                path: "/api/",
              }),
              cookie.serialize("refresh", refreshData.refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                maxAge: refreshTokenMaxAge,
                sameSite: "strict",
                path: "/api/",
              }),
            ]);

            // update access token variable with the new access token
            access = refreshData.access;

            // retry the original request with the new access token
            const apiRes = await axios.get(`${API_URL}/users/load/`, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${access}`,
              },
            });
            const data = apiRes.data;

            if (apiRes.status === 200) {
              return res.status(200).json({
                user: data,
              });
            } else {
              return res.status(apiRes.status).json({
                error: data.error,
              });
            }
          } else {
            return res.status(apiRefreshRes.status).json({
              error: "Error refreshing access token",
            });
          }
        } catch (err) {
          return res.status(500).json({
            error: "Something went wrong when refreshing token",
          });
        }
      } else {
        // refresh token is not available
        return res.status(401).json({
          error: "User unauthorized to make this request",
        });
      }
    }

    try {
      const apiRes = await axios.get(`${API_URL}/users/load/`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = apiRes.data;

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when retrieving user",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
