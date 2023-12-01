// Export a function called 'validateSchema'. This function takes a 'schema' as its parameter.
export const validateSchema =
  (schema) =>
  // The function returns another function, which is a middleware for Express.
  // This middleware function takes the standard Express arguments: req (request), res (response), and next (the next middleware function).
  (req, res, next) => {
    try {
      // Attempt to validate the request body against the provided schema.
      // 'schema.parse' will check if 'req.body' conforms to the structure and rules defined in 'schema'.
      schema.parse(req.body);

      // If the request body is valid according to the schema, call 'next()'.
      // This moves processing to the next middleware in the Express stack.
      next();
    } catch (error) {
      // If an error occurs during validation (i.e., the request body doesn't conform to the schema),
      // catch that error and handle it here.

      // Send a response back to the client with a status code of 400 (Bad Request).
      // This indicates that something was wrong with the request.
      return (
        res
          .status(400)
          // In the JSON response, include an 'error' property.
          // This property is an array created by mapping over 'error.errors'.
          // 'error.errors' contains details of what went wrong during validation.
          // For each error object in 'error.errors', extract and return its 'message' property.
          // This creates an array of error messages that are sent back to the client.
          .json({ error: error.errors.map((error) => error.message) })
      );
    }
  };
