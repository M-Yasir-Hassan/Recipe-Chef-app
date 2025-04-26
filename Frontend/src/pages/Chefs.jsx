import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/chefs.css";
import axios from "axios";
import API_BASE_URL from "../constant.js";

const Chefs = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        const fetchChefs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/users/chefs`);
                setChefs(response.data.data);
            } catch (error) {
                console.error("Error fetching chefs:", error);
            }
        };

        fetchChefs();
    }, []);

    return (
        <>
            <Navbar />
            <div className="chefsContainer">
                <h1>Meet Our Chefs</h1>
                <div className="chefsGrid">
                    {chefs.map((chef) => (
                        <div key={chef._id} className="chefCard">
                            <img src="assets/Chef-bro.svg" alt={chef.username} className="chefImage" />
                            <h3>{chef.username}</h3>
                            <p>Email: {chef.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Chefs;