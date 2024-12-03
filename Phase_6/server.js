const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

