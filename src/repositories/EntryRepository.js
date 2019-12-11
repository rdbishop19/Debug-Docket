import Settings from './Settings'

export default {
    // get single entry information
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/entries/${id}`)
        return await e.json()
    },
    // create new entry
    async createEntry(entry) {
        const data = await fetch(`${Settings.remoteURL}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
        return await data.json()
    },
    async getEntry(id) {
        const data = await fetch(`${Settings.remoteURL}/entries/${id}?_expand=severity&_expand=priority&_expand=category`)
        return await data.json()
    },
    // delete specific entry
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/entries/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    // get all entries from system
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/entries`)
        return await e.json()
    },

    // update entry from the edit view
    async updateEntry(newEntry) {
        const e = await fetch (`${Settings.remoteURL}/entries/${newEntry.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        })
        return await e.json()
    }
}