import { useEffect, useState } from "react";
import { Modal, List, Input, Button, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/recipeDetails.css";
import API_BASE_URL from "../constant.js";

const RecipeDetailsModal = ({ visible, onCancel, recipeDetails }) => {
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser.data.data.user._id;

    const [comments, setComments] = useState([]); // Ensure comments is initialized as an array
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (visible && recipeDetails?._id) {
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/v1/comments/${recipeDetails._id}`);
                    setComments(response.data.data);
                } catch (error) {
                    message.error("Failed to fetch comments");
                }
            };

            fetchComments();
        }
    }, [visible, recipeDetails]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            message.warning("Comment cannot be empty");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/comments/add`, {
                recipeId: recipeDetails._id,
                userId,
                comment: newComment,
            });

            // Ensure prevComments is treated as an array
            setComments((prevComments) => Array.isArray(prevComments) ? [...prevComments, response.data.data] : [response.data.data]);
            setNewComment("");
            message.success("Comment added successfully");
        } catch (error) {
            console.error("Error adding comment:", error);
            message.error("Failed to add comment");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/v1/comments/${commentId}`);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            message.success("Comment deleted successfully");
        } catch (error) {
            console.error("Error deleting comment:", error);
            message.error("Failed to delete comment");
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            footer={null}
            title={recipeDetails?.name || "Recipe Details"}
        >
            <div className="recipeDetailsContent">
                <p><strong>Description:</strong> {recipeDetails?.description}</p>
                <p><strong>Ingredients:</strong> {recipeDetails?.ingredients?.join(", ")}</p>
                <p><strong>Instructions:</strong> {recipeDetails?.instructions}</p>

                <div className="commentsSection">
                    <h3>Comments</h3>
                    <List
                        dataSource={comments}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<DeleteOutlined key="delete" onClick={() => handleDeleteComment(item._id)} />]}
                            >
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
        </Modal>
    );
};

RecipeDetailsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    recipeDetails: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
        instructions: PropTypes.string,
    }).isRequired,
};

export default RecipeDetailsModal;
