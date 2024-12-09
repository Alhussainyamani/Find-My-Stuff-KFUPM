// Applies pagination to a Mongoose query.
const paginate = (query, { page = 1, limit = 10 }) => {
    // Validate that 'page' is a positive integer.
    if (!Number.isInteger(page) || page < 1) {
        throw new Error("Invalid value for 'page'. It must be a positive integer.");
    }

    // Validate that 'limit' is a positive integer.
    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error("Invalid value for 'limit'. It must be a positive integer.");
    }

    // Calculate the number of documents to skip.
    const skip = (page - 1) * limit;

    // Apply the calculated 'skip' and 'limit' to the query and return it.
    return query.skip(skip).limit(limit);
};

module.exports = paginate; // Export the utility function for use in other files.
