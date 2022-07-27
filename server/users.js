let users = []

const addUser = ({ id, name, room }) => {
    // removes white spaces and turns to lower case
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    let isUserExist = users.find((user) => user.name === name && user.room === room)
    // if true, keep adding "2" to the username until we get an available name
    while (isUserExist) {
        name = name + "2"
        isUserExist = users.find((user) => user.name === name && user.room === room)
    }
    const newUser = { id, name, room }
    users.push(newUser)
    return { newUser }
}

const removeUser = (id) => {
    const user = users.find((user) => user.id === id)
    if (user) {
        users = users.filter((existingUser) => existingUser.id !== user.id)
        return user
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users }