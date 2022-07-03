let activeUsers: {id: string, username: string}[] = []

export const connect = (id: string, username: string ) => {
    const user = activeUsers.find(user => user.username === username)
    if (user) {
        return false
    }
    activeUsers.push({id, username})
    return true
}

export const disconnect = (id: string) => {
    activeUsers = activeUsers.filter(user => user.id !== id)
}

export const getActiveUsers = () => activeUsers;