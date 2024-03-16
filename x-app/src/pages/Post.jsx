import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { PostCard } from "../componenets/PostCard";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({});

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            const api = import.meta.env.VITE_API_URL;
            const res = await fetch(`${api}/posts/${id}`);
            const data = await res.json();

            setPost(data);
            setIsLoading(false);
        })();
    }, []);

    return (
        <Box>
            {isLoading ? (
                <Box>Loading...</Box>
            ) : (
                <>
                    <PostCard
                        post={post}
                        like={() => { }}
                        unlike={() => { }}
                    />
                    <hr />
                    {
                        post.comment.map(comment => {
                            return <PostCard
                                key={comment._id}
                                post={comment}
                                like={() => { }}
                                unlike={() => { }}
                            />
                        })
                    }
                </>
            )}
        </Box>
    );
}