import Settings from './Settings'

export default {
    // get all friends of currently logged in user
    async getAllFriends(id) {
        const data = await fetch(`${Settings.remoteURL}/friends?loggedInUserId=${id}&_expand=user`)
        return await data.json()
    },
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/entries/${id}`)
        return await e.json()
    },
    // create new friend relationship
    async addFriend(connectionObj) {
        const data = await fetch(`${Settings.remoteURL}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(connectionObj)
        })
        return await data.json()
    },
    //remove a friend from your friends list
    async removeFriend(id) {
        const data = await fetch(`${Settings.remoteURL}/friends/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await data.json()
    }
}