import * as userService from "../services/userService.js"

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers()
    console.log(users)
    res.json(users)
}

async function getAllAuthors(req, res) {
    const authors = await userService.getAllAuthors()
    console.log(authors)
    res.json(authors)
}

async function getUserById(req, res) {
    res.json("ID")
}

async function postBecomeAuthor(req, res) {
    try {
		const { password } = req.body
        console.log("Reached Controller")
		const user = await userService.postBecomeAuthor(req.user.user.id, password)

		res.json(user)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
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
    deleteUser,
    postBecomeAuthor
}