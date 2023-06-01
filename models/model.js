import { pool } from "../database/connections.js";

const getPosts = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.log("An error occurred!", error.routine)
    // console.log(error.routine)
    throw { code: error.code }
  }
};


const newPost = async (title, img, desc) => {

  if (!title || !img || !desc) {
    throw { code: "400" }
  }

  const query = "INSERT INTO posts VALUES (DEFAULT,$1,$2,$3,0) RETURNING*";
  const values = [title, img, desc];

  try {
    const result = await pool.query(query, values);
    // FOR BACKEND MONITORING
    console.log("---------------------------------------------------------------");
    console.log("Instruccion procesada: ", result.command);
    console.log("Filas procesadas: ", result.rowCount);
    console.log("Informacion ingresada: ", result.rows[0]);
    console.log("----------------------------------------------------------------");

    return result.rows[0];
  } catch (error) {
    console.log("An error occurred!")
    console.log(error)
  }


}

const deletePost = async (id) => {

  if (!id) {
    throw { code: "400" }
  }

  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id]

  // try {
  const result = await pool.query(query, values);
  // FOR BACKEND MONITORING
  console.log("---------------------------------------------------------------");
  console.log("Instruccion procesada: ", result.command);
  console.log("Filas procesadas: ", result.rowCount);
  console.log("Informacion eliminada: ", result.rows[0]);
  console.log("----------------------------------------------------------------");

  return result.rows[0]
  // } catch (error) {
  //   console.log("An error occurred!")
  //   console.log(error)
  // }
}

const updatePostLike = async (id) => {
  if (!id) {
    throw { code: "400" }
  }
  const query = "SELECT * FROM posts WHERE id = $1 ";
  const values = [id];
  try {
    const { rows } = await pool.query(query, values);
    const selectedRows = rows;

    if (selectedRows.length > 0) {
      const getLikeQuery = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *";
      const newLikeCount = selectedRows[0].likes === 0 ? 1 : selectedRows[0].likes + 1;
      const updateValues = [newLikeCount, id];
      const result = await pool.query(getLikeQuery, updateValues);

      console.log("---------------------------------------------------------------");
      console.log("Instruccion procesada: ", result.command);
      console.log("Filas procesadas: ", result.rowCount);
      console.log("Informacion eliminada: ", result.rows[0]);
      console.log("----------------------------------------------------------------");

      return result.rows[0];
    }
  } catch (error) {
    console.log("An error occurred!")
    console.log(error)
  }
}

export const myModel = {
  getPosts,
  newPost,
  deletePost,
  updatePostLike
}