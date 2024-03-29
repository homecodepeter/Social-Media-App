import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import cors from "cors"
import  { fileURLToPath } from "url"
import path from "path";
import dotenv from "dotenv";
import { register } from "./controller/auth.js";
import { createPost } from "./controller/post.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import { users  } from "./data/index.js";
import User from "./models/User.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });


app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPost);

// ROUTER SET UP
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
// mongo SET UP

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Port : ${PORT}`);

        // ADD DATA ONE TIME
        // User.insertMany(users);
    })
}).catch((error) => console.log(`${error} did not connect`));
