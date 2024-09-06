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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists using Sequelize
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }else{
      return res.status(201).json(user);
    }

    // // Create a JWT token
    // const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    // return res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
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


export {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser
};
