import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("This is the create error", error);
    res
      .status(500)
      .json({ message: "Error creating user", error });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params; // Extract id from request parameters
  const { username, email, password } = req.body; // Extract fields to update from request body

  try {
    // Find the user by primary key (id)
    const user = await User.findByPk(id); // `findByPk` is generally preferred for finding by primary key

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password if provided; otherwise, use the existing password
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    // Update the user with the provided details
    await user.update({
      username: username || user.username, // Update only if provided
      email: email || user.email, // Update only if provided
      password: hashedPassword // Always update password if provided
    });

    // Return the updated user
    res.json(user);
  } catch (error) {
    console.error("Update Error:", error); // Log errors to the console
    res.status(500).json({ message: "Error updating user", error });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy({
      where: {
        id: 1
      }
    }).then(deletedRows => {
      console.log(`${deletedRows} row(s) deleted.`);
    }).catch(err => {
      console.error('Error deleting row:', err);
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.log("This is delete Error", error);
    res
      .status(500)
      .json({ message: "Error deleting user", error });
  }
};

const loginUser =  async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = User.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create a JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.json({ token });
};


export {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};

// app.use(express.json());

// app.get('/api/users', async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });

// app.put('/api/users/update:id', async (req, res) => {
//   const id = req.params.id;
//   const { name, email, phone, address } = req.body;
//   const user = await User.update({ name, email, phone, address }, { where: { id } });
//   res.json(user);
// });

// app.delete('/api/users/delete:id', async (req, res) => {
//   const id = req.params.id;
//   await User.destroy({ where: { id } });
//   res.json({ message: 'User deleted successfully' });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

