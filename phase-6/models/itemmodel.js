import mongoose from "mongoose";

// Define the schema for items
const itemSchema = new mongoose.Schema(
  {
    // Name of the person associated with the item
    name: {
      type: String,
      required: [true, "Name is required"], // Custom error message
      trim: true, // Removes leading/trailing whitespace
      maxlength: 100, // Ensures a reasonable length for the name
    },

    // Email of the person associated with the item
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    // Phone number of the person associated with the item
    phoneno: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{7,15}$/.test(v); // Validates phone number (with or without international code)
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    // Title of the report or item
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150, // Restrict the title to a reasonable length
    },

    // Description of the item
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 500, // Restrict the description length
    },

    // Image URL for the item
    image: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i.test(v); // Validate image URL only if provided
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const Item = mongoose.model("itemSchema", itemSchema); // Model name unchanged
