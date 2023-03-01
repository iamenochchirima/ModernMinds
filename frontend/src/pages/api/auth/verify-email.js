import { API_URL } from "../../../config/index";
import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { uid, token } = req.body;

    const body = {
      uid,
      token,
    };

    try {
        const apiRes = await axios.get(`${API_URL}/users/verify-email/${uid}/${token}/`, body, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

      if (apiRes.status === 200) {
        return res.status(200).json({
          success: "Verified successfully",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Verification failed",
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
