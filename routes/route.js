import { Router } from "express";
import { myController } from "../controllers/controller.js";

const myRouter = Router();

myRouter.get("/posts", myController.getAllPosts);
myRouter.post("/posts", myController.addNewPost);
myRouter.put("/posts/like/:id", myController.updatePostLikeCount);
myRouter.delete("/posts/:id", myController.deletePostFromDB);

export default myRouter;