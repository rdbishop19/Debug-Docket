import Settings from './Settings'

export default {
    // get single user information
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/users/${id}`)
        return await e.json()
    },
    // create new user account
    async createAccount(user) {
        const data = await fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return await data.json()
    },
    // find specific user by email/password
    async findUser(email, password) {
        const data = await fetch(`${Settings.remoteURL}/users?email=${email}&password=${password}`)
        return await data.json()
    },
    // delete specific user (stretch goal)
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/users/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    // get all users from system
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/users?_sort=firstName`)
        return await e.json()
    }
}