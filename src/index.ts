import express, { Request, Response } from 'express';
import createUserController from './auth/presentation/controllers/create-user.controller';
import updateUserController from './auth/presentation/controllers/update-user.controller';
import getUserController from './auth/presentation/controllers/read-user.controller';
import deleteUserController from './auth/presentation/controllers/delete-user.controller';
import getUsersListController from './auth/presentation/controllers/read-users-list.controller';
import * as dotenv from 'dotenv';

const app = express();
const port = 5005;

dotenv.config();  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/auth', createUserController);
app.use('/auth', updateUserController);
app.use('/auth', getUsersListController);
app.use('/auth', getUserController);
app.use('/auth', deleteUserController);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up and running');
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
