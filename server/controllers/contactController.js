const Contact = require("../models/Contact");

// ==============================
// SEND CONTACT MESSAGE
// ==============================

const sendMessage = async (req, res) => {
    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });

        }

        // Save message
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });

    } catch (error) {

        console.error(
            "Contact Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });

    }
};

module.exports = {
    sendMessage
};