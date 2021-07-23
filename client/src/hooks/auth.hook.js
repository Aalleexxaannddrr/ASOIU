import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [isOrganizer, setIsOrganizer] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id, organizer) => {
        setToken(jwtToken)
        setUserId(id)
        setIsOrganizer(organizer)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, isOrganizer: organizer
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsOrganizer(false)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.isOrganizer)
        }

    }, [login])
    
    return {login, logout, token, userId, isOrganizer}

} 