import  { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message, Spin } from "antd";
import Navbar from "../components/Navbar.jsx";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import API_BASE_URL from "../constant.js";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const userID = currentUser.data.data.user._id;
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/users/get/${userID}`);
                setUserDetails(response.data.data);
            } catch (err) {
                console.error(err);
                message.error("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userID]);

    const handleEdit = () => {
        form.setFieldsValue(userDetails);
        setIsModalOpen(true);
    };

    const handleUpdate = async (values) => {
        try {
            console.log(values);
            const response = await axios.put(`${API_BASE_URL}/api/v1/users/update/${userID}`, values);
            setUserDetails(response.data.data);
            message.success("Profile updated successfully");
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            message.error("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="loaderContainer">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="profileContainer">
                <div className="profileHeader">
                    <h2>Profile</h2>
                </div>
                <div className="profileDetails">
                    <p><strong>Name:</strong> {userDetails?.username || "N/A"}</p>
                    <p><strong>Email:</strong> {userDetails?.email}</p>
                    <Button type="link" onClick={handleEdit} className="editButton">Edit</Button>
                </div>

                <Modal
                    title="Edit Profile"
                    visible={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdate}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please input your name!" }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder="Enter your email" disabled />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}