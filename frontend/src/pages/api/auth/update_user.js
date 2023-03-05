import { API_URL } from "../../../config/index";
import cookie from "cookie";
import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    const {
        first_name,
        last_name,
        country,
        gender,
    } = req.body;

    const body = {
        first_name,
        last_name,
        country,
        gender,
    };

    try {
      const apiRes = await axios.put(`${API_URL}/users/update/`, body, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.data;

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
        error: "Something went wrong when updating user",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
