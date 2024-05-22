import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {async function a(){
        const res = await axios.get("http://localhost:3000/api/v1/user/bulk")
        setUsers(res.data.user)};
    a()
    },[])
    useEffect(() => {
        setFilteredUsers(users.filter(user => user.first_name.includes(filter) || user.last_name.includes(filter)))
    },[filter]);
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {filteredUsers.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.first_name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.first_name} {user.last_name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {

                navigate("/send?name="+user.first_name+"&id="+user._id)
                }} label={"Send Money"} />
        </div>
    </div>
}