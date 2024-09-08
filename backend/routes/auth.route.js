import express from "express";
import authController

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup route");
});
router.get("/login");
router.get("/logout", (req, res) => {
  res.send("Logout route");
});

export default router;