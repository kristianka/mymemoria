
const LoginPage = (props) => {

    return (
        <div className="container mx-auto px-4">
            <div className="bg-green-500 text-sm text-white rounded-md p-4" role="alert">
                <p>Welcome back {props.name}!</p>
            </div>
            <h3>Login</h3>
        </div>
    )
}

export default LoginPage;