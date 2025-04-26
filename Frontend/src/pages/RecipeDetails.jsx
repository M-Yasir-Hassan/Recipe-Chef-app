import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input, Button, List, message } from "antd";
import "../styles/recipeDetails.css";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/v1/comments/${recipeId}`);
                setComments(response.data.data);
            } catch (error) {
                message.error("Failed to fetch comments");
            }
        };

        fetchComments();
    }, [recipeId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            message.warning("Comment cannot be empty");
            return;
        }

        try {
            const response = await axios.post(`/api/v1/comments/add`, {
                recipeId,
                userId: "currentUserId", // Replace with actual user ID from context or state
                comment: newComment,
            });

            setComments([...comments, response.data.data]);
            setNewComment("");
            message.success("Comment added successfully");
        } catch (error) {
            message.error("Failed to add comment");
        }
    };

    return (
        <div className="recipeDetailsContainer">
            <h2>Recipe Details</h2>
            {/* Recipe details section here */}

            <div className="commentsSection">
                <h3>Comments</h3>
                <List
                    dataSource={comments}
                    renderItem={(item) => (
                        <List.Item>
                            <strong>{item.userId.username}:</strong> {item.comment}
                        </List.Item>
                    )}
                />

                <Input.TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    rows={4}
                />
                <Button type="primary" onClick={handleAddComment} style={{ marginTop: "10px" }}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default RecipeDetails;