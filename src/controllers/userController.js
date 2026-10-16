import * as userService from "../services/userService.js"

async function getAllUsers(req, res) {
    const users = userService.getAllUsers()
    res.json(users)
}

async function getAllAuthors(req, res) {

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
    getAllAuthors,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}