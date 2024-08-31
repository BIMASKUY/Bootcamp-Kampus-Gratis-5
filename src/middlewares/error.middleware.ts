import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.error(err);
        if (err.name === 'CastError') res.status(400).send('format ID tidak valid');
        else res.status(400).send(`error: ${err.message}`);
    }
    next();
}