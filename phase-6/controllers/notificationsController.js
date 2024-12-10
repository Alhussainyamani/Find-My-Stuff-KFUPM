const Notification = require("../models/Notification");

// Get all notifications for a specific user
const getNotificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch notifications for the given user ID
        const notifications = await Notification.find({ createdBy: userId }).sort({ date: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { date, description, reportNumber } = req.body;

        // Create the notification
        const newNotification = new Notification({
            date,
            description,
            reportNumber,
            createdBy: req.user.id, // Assuming `req.user` is set by authentication middleware
        });

        const savedNotification = await newNotification.save();
        res.status(201).json({
            message: "Notification created successfully",
            notification: savedNotification,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating notification" });
    }
};

module.exports = {
    getNotificationsByUserId,
    createNotification,
};
