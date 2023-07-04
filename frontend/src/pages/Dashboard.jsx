import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  useEffect(()=> {
    console.log(11111)
    if(!user) {
      navigate('/login')
    }
  }, [navigate, user])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard