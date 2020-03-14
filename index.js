const express = require('express');
const shortid = require('shortid');
const server = express();

server.get('/', (req, res) => {
  res.send('hello world from express');
});
server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: 'Peter Parker',
    bio: 'high schooler'
  },

  {
    id: shortid.generate(),
    name: 'Bruce Wyane',
    bio: 'batman'
  }
];

//do the get - user information
server.get('/api/user', (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved.' });
  }
});
/// do the post - new user// Create
server.post('/api/user', (req, res) => {
  const user = req.body;

  if (users) {
    const newUser = {
      id: shortid.generate(),
      name: user.name,
      bio: user.bio
    };
    users.push(newUser);

    res.status(201).json({ message: `user created ${user.name}` });
  }
});
//  get a user
server.get('/api/user/:id', (req, res) => {
  const { id } = req.params;

  const findUser = users.find(find => find.id === id);

  if (findUser) {
    res.status(200).json(findUser);
  } else {
    res.status(404).json({
      message: 'The user with the specified fgsdfgfID does not exist.'
    });
  }
});

// update user
server.put('/api/user/:id', (req, res) => {
  const edituser = req.body;
  const id = req.params.id;

  let index = users.findIndex(putUser => putUser.id === id);

  if (index !== -1) {
    users[index] = edituser;
    res.status(200).json(users[index]);
  }
});

// delete user
server.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const index = users.find(dUser => dUser.id === id);

  if (index) {
    users = users.filter(deleted => deleted.id !== id);
    res.status(200).json('worked');
  }
});

server.listen(5000, () => console.log('API running on port 5000'));
