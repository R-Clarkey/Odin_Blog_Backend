async function getAllUsers(req, res) {
    res.json("Users")
}

async function getUserById(req, res) {
    res.json("ID")
}

async function createUser(req, res) {
    res.json("Create")
}

async function updateUser(req, res) {
    res.json("Update")
}

async function deleteUser(req, res) {
    res.json("Delete")
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}