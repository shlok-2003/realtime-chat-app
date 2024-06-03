import express, { Request, Response, Application } from 'express';

//? SETUP
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

export default app;