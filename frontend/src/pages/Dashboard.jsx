import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {async function Bal(){const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
     console.log(res.data)
    setBalance(res.data.balance)}
    Bal()},[]);
    return (<div className="p-4">
        <Appbar />
        <br />
        <Balance value={balance} />
        <Users  />
    </div>)
}

export default Dashboard;