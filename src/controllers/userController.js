import * as userService from "../services/userService.js"

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers()
    res.json(users)
}

async function getAllAuthors(req, res) {
    console.log("Before call")
    const authors = await userService.getAllAuthors()
    console.log("Testing")
    console.log(authors)
    res.json(authors)
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

export {
    getAllUsers,
    getAllAuthors,
    postBecomeAuthor
}