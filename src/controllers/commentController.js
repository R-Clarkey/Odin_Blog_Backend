async function getCommentsByPost(req, res) {
    res.json("Comments")
}

async function createComment(req, res) {
    res.json("Create")
}

async function getCommentById(req, res) {
    res.json("By ID")
}

async function updateComment(req, res) {
    res.json("Update")
}

async function deleteComment(req, res) {
    res.json("Delete")
}

export {
    getCommentsByPost,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
}