import {useContext, useEffect}  from "react"
import { Navigate } from "react-router-dom"
import {UserContext} from "../context/userContext"

const ProtectedRoute = ({children}) => {
    const {user, fetchUserProfile, loading} = useContext(UserContext)

    useEffect(() => {
        if (!user && !loading) {
            fetchUserProfile()
        }
    }, [user, fetchUserProfile, loading])

    if(loading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return <Navigate to='/' />
    }
    return children
}

export default ProtectedRoute