import { handleErrors } from "../database/errors.js";
import { myModel } from "../models/model.js";


// GET FUNCTION TO RETRIEVE THE EXISTING POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await myModel.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message }); //respuesta del servidor

  }
}

// POST FUNCTION TO ADD A NEW ENTRY (post) TO THE DB
const addNewPost = async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  try {
    const result = await myModel.newPost(titulo, url, descripcion);
    return res.status(201).json({ ok: true, message: "Nuevo post agregado", result })
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
  }

}

// PUT FUNCTION TO ADD LIKE TO AN EXISTING POST
const updatePostLikeCount = async (req, res) => {
  const { id } = req.params;
  try {

    const likes = await myModel.updatePostLike(id);
    return res.status(201).json({ ok: true, message: "Cantidad de likes actualizada.", likes })

  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message }); //respuesta del servidor

  }
}

// DELETE FUNCTION TO REMOVE AN EXISTING POST

const deletePostFromDB = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await myModel.deletePost(id)
    if (!result) {
      return res.status(201).json({ ok: false, message: `No hay post para eliminar con ese id.` })
    } else {
      return res.status(201).json({ ok: true, message: "Se eliminó el post", result })
    }
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
  }
}


export const myController = { getAllPosts, addNewPost, deletePostFromDB, updatePostLikeCount }