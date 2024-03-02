import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { PostCard } from "../componenets/PostCard";

export default function Home() {

    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const api = import.meta.env.VITE_API_URL;
            const res = await fetch(`${api}/posts`);
            const data = await res.json();

            setPosts(data);
            setIsLoading(false);
        })();
    }, []);

    return (
        <Box>
            {isLoading ? (<Box>Loading...</Box>) : (
                posts.map(item => <PostCard post={item} key={item._id} />)
            )}
        </Box>
    )
}