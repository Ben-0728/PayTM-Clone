async function main(){
    const res = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: 'John',
            last_name: 'Doe',
            username: 'john3@doe.com',
            password: 'password'})
})
const data = await res.json();
console.log(data);
}

main();