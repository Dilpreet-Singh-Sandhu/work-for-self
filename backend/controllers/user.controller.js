import User from "../models/user.model.js";



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
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};



const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    await user.update({ username, email, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};



const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
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

