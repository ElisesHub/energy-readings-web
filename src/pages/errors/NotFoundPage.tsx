import { Link } from "react-router-dom";
export default function NotFoundPage()
{
    return(
    <div>
        <h1>404 not found</h1>
        <br/><br/>
        We didn't find what you were looking for <br/><br/>
        <Link to="/">Home</Link>
    </div>
    );
};