import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import PostsServices from "../services/posts.service";

function OwnerOnly({ children }) {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [authorId, setAuthorId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PostsServices.getPostById(id);
                if (response.status === 200) {
                    setAuthorId(response.data.author._id);
                }
            } catch (error) {
                console.log("Error:", error?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    if (loading) return <div>Loading...</div>;


    if (user.id !== authorId) {
        return <Navigate to="/notallow" />;
    }

    return children;
}

export default OwnerOnly;
