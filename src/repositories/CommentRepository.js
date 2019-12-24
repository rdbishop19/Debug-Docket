import Settings from './Settings'

export default {
    // get single comment information
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/comments/${id}`)
        return await e.json()
    },
    // create new comment
    async postNewComment(comment) {
        const data = await fetch(`${Settings.remoteURL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        return await data.json()
    },
    // delete specific comment
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/comments/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    // get all comments from system
    async getSingleEntryCommentList(entryId) {
        const e = await fetch(`${Settings.remoteURL}/comments?entryId=${entryId}&_sort=timestamp&_expand=user`)
        return await e.json()
    },

    // update comment account
    async updateComment(comment){
        const data = await fetch(`${Settings.remoteURL}/comments/${comment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        return await data.json()
    },
}