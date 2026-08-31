import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        degree: "",
        college: "",
        year: "",
        targetRole: "",
        skills: []
    });

    // ==============================
    // FETCH PROFILE
    // ==============================

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const userData = response.data.user;

                setUser(userData);

                setFormData({
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: userData.phone || "",
                    degree: userData.degree || "BCA",
                    college: userData.college || "",
                    year: userData.year || "Final Year",
                    targetRole: userData.targetRole || "",
                    skills: userData.skills || []
                });

            } catch (error) {

                console.error(
                    "Profile Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="profile-loading">
                <div className="profile-loader"></div>
                <p>Loading your profile...</p>
            </div>
        );

    }

    // ==============================
    // AVATAR
    // ==============================

    const avatarLetter =
        user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U";

            const handleSave = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await API.put(
            "/profile",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const updatedUser = response.data.user;

        setUser(updatedUser);

        setFormData({
            name: updatedUser.name || "",
            email: updatedUser.email || "",
            phone: updatedUser.phone || "",
            degree: updatedUser.degree || "BCA",
            college: updatedUser.college || "",
            year: updatedUser.year || "Final Year",
            targetRole: updatedUser.targetRole || "",
            skills: updatedUser.skills || []
        });

        setEditing(false);

        alert("Profile updated successfully!");

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to update profile"
        );

    }

};

    return (

        <div className="profile-page">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="profile-page-header">

                <div>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        Manage your personal information
                        and career preferences.
                    </p>

                </div>

                <button
                    className={
                        editing
                            ? "profile-cancel-btn"
                            : "profile-edit-btn"
                    }
                    onClick={() =>
                        setEditing(!editing)
                    }
                >
                    {editing
                        ? "✕ Cancel"
                        : "✏️ Edit Profile"}
                </button>

            </div>


            {/* ================================= */}
            {/* PROFILE HERO */}
            {/* ================================= */}

            <div className="profile-hero-card">

                <div className="profile-avatar-large">

                    {avatarLetter}

                </div>

                <div className="profile-hero-info">

                    <h2>
                        {user?.name || "Student"}
                    </h2>

                    <p>
                        {user?.targetRole ||
                            "BCA Student"}
                    </p>

                    <span>
                        ✉️ {user?.email}
                    </span>

                </div>

                <div className="profile-status">

                    <span className="status-dot"></span>

                    Active

                </div>

            </div>


            {/* ================================= */}
            {/* MAIN GRID */}
            {/* ================================= */}

            <div className="profile-content-grid">


                {/* ================================= */}
                {/* PERSONAL INFORMATION */}
                {/* ================================= */}

                <div className="profile-card">

                    <div className="profile-card-title">

                        <div className="profile-card-icon">
                            👤
                        </div>

                        <div>
                            <h3>
                                Personal Information
                            </h3>

                            <p>
                                Your basic account details
                            </p>
                        </div>

                    </div>


                    <div className="profile-fields">

                        <div className="profile-field">

                            <label>
                                Full Name
                            </label>

                            {editing ? (

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            ) : (

                                <div className="profile-value">
                                    {user?.name || "Not added"}
                                </div>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>
                                Email
                            </label>

                            <div className="profile-value">
                                {user?.email || "Not added"}
                            </div>

                        </div>


                        <div className="profile-field">

                            <label>
                                Phone
                            </label>

                            {editing ? (

                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />

                            ) : (

                                <div className="profile-value">
                                    {user?.phone ||
                                        "Not added"}
                                </div>

                            )}

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* EDUCATION */}
                {/* ================================= */}

                <div className="profile-card">

                    <div className="profile-card-title">

                        <div className="profile-card-icon">
                            🎓
                        </div>

                        <div>
                            <h3>
                                Education
                            </h3>

                            <p>
                                Your academic background
                            </p>
                        </div>

                    </div>


                    <div className="profile-fields">

                        <div className="profile-field">

                            <label>
                                Degree
                            </label>

                            {editing ? (

                                <input
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                />

                            ) : (

                                <div className="profile-value">
                                    {user?.degree ||
                                        "BCA"}
                                </div>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>
                                College / University
                            </label>

                            {editing ? (

                                <input
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    placeholder="Enter college name"
                                />

                            ) : (

                                <div className="profile-value">
                                    {user?.college ||
                                        "Not added"}
                                </div>

                            )}

                        </div>


                        <div className="profile-field">

                            <label>
                                Academic Year
                            </label>

                            {editing ? (

                                <input
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                />

                            ) : (

                                <div className="profile-value">
                                    {user?.year ||
                                        "Final Year"}
                                </div>

                            )}

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* CAREER */}
                {/* ================================= */}

                <div className="profile-card career-card">

                    <div className="profile-card-title">

                        <div className="profile-card-icon career-icon">
                            🚀
                        </div>

                        <div>
                            <h3>
                                Career Preferences
                            </h3>

                            <p>
                                Your professional direction
                            </p>
                        </div>

                    </div>


                    <div className="profile-field">

                        <label>
                            Target Role
                        </label>

                        {editing ? (

                            <input
                                name="targetRole"
                                value={
                                    formData.targetRole
                                }
                                onChange={handleChange}
                                placeholder="e.g. MERN Developer"
                            />

                        ) : (

                            <div className="target-role">

                                {user?.targetRole ||
                                    "MERN Developer"}

                            </div>

                        )}

                    </div>

                </div>


                {/* ================================= */}
                {/* SKILLS */}
                {/* ================================= */}

                <div className="profile-card">

                    <div className="profile-card-title">

                        <div className="profile-card-icon">
                            💻
                        </div>

                        <div>
                            <h3>
                                Skills
                            </h3>

                            <p>
                                Your technical skill set
                            </p>
                        </div>

                    </div>


                    <div className="profile-skills">

                        {user?.skills?.length > 0 ? (

                            user.skills.map(
                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="skill-tag"
                                    >
                                        {skill}
                                    </span>

                                )
                            )

                        ) : (

                            <span className="no-skills">
                                No skills added yet
                            </span>

                        )}

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* SAVE BUTTON */}
            {/* ================================= */}

            {editing && (

                <div className="profile-save-section">

                    {/* <button
                        className="profile-save-btn"
                        onClick={() => {
                            alert(
                                "Save API will be connected next."
                            );
                        }}
                    >
                        💾 Save Changes
                    </button> */}
                    <button
    className="profile-save-btn"
    onClick={handleSave}
>
    💾 Save Changes
</button>

                </div>

            )}

        </div>

    );

}

export default Profile;