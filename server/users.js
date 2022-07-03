const users = []

const addUser = ({ id, name, room }) => {
    // removes white spaces and turns to lower case
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const isUserExist = users.find((user) => user.name === name && user.room === room)
    if (!name || !room) return { error: 'Username and room are required.' }
    if (isUserExist) return { error: "Username is already used" }

    const newUser = { id, name, room }
    users.push(newUser)
    return { newUser }
}

const removeUser = (id) => {
    const user = users.find((user) => user.id === id)
    if (user) {
        users.splice(user, 1)[0]
        return user
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => { users.find((user) => user.room === room) }

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users }