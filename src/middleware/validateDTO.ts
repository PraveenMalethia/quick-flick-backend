import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// Middleware to validate DTOs (Data Transfer Objects)
export function validateDTO<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('Validating DTO...', { data: req.body });
      // Convert the request body to the appropriate DTO instance
      const dtoInstance = plainToInstance(dtoClass, req.body, { enableImplicitConversion: true });

      // Validate the instance
      const errors = await validate(dtoInstance, { whitelist: true , forbidNonWhitelisted: true });

      // If validation errors exist, respond with a 400 status and the error details
      if (errors.length > 0) {
        const formattedErrors: Record<string, string> = {};

        // Map the errors into the desired format
        errors.forEach((error) => {
          const constraints = error.constraints; // Get all constraints
          if (constraints) {
            const errorMessage = Object.values(constraints)[0]; // Take the first error message
            formattedErrors[error.property] = errorMessage;
          }
        });

        // Send the formatted error response
        console.log('DTO validation failed...', { errors: formattedErrors });
        next(formattedErrors)
        return; // Just send the response and stop here
      }


      // Attach the validated DTO instance to the request body
      req.body = dtoInstance;

      // Proceed to the next middleware if validation passed
      next();
      console.log('DTO validation passed, proceeding to next middleware...');
    } catch (err) {
      console.error('Error during DTO validation:', err);
      next(err); // Pass the error to the next middleware (error handler)
    }
  };
}
