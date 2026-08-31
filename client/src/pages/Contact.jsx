import { useState } from "react";
import API from "../services/api";
import "../styles/contact.css";
import contactImage from "../assets/contact-ai.png";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSuccess("");
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            setError("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post(
                "/contact",
                formData
            );

            if (response.data.success) {

                setSuccess(
                    "Your message has been sent successfully! 🚀"
                );

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });

            }

        } catch (error) {

            console.error(
                "Contact Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="contact-page">

            {/* LEFT SIDE */}

            <div className="contact-left">

                <span className="contact-badge">
                    ✉️ Get In Touch
                </span>

                <h1>
                    We'd Love to
                    <br />
                    Hear From <span>You!</span>
                </h1>

                <p className="contact-description">
                    Have a question, feedback, or need support?
                    Our team is here to help you.
                </p>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                >

                    <div className="contact-row">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Subject
                        </option>

                        <option value="Resume Analysis">
                            Resume Analysis
                        </option>

                        <option value="Interview Coach">
                            Interview Coach
                        </option>

                        <option value="Technical Issue">
                            Technical Issue
                        </option>

                        <option value="Feedback">
                            Feedback
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "➤ Send Message"}

                    </button>

                </form>

                {success && (
                    <div className="contact-success">
                        ✅ {success}
                    </div>
                )}

                {error && (
                    <div className="contact-error">
                        ❌ {error}
                    </div>
                )}

                <p className="privacy-text">
                    🔒 We respect your privacy. Your information
                    is safe with us.
                </p>

            </div>


            {/* RIGHT SIDE */}

            <div className="contact-right">

                <img
                    src={contactImage}
                    alt="SkillForge AI Assistant"
                />

            </div>

        </div>

    );

}

export default Contact;