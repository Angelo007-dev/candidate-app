import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.APP_PORT || 3001;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/candidate-app")
    .then(() => {
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })