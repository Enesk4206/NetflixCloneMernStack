import express from "express";

//routes
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

//configures
import { ENV_VARS } from "../config/envVars.js";
import { connectDB } from "../config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes); //ilk olarak route gider yönlendirme yapılır route içerisindeki function ile de controllera gider

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
