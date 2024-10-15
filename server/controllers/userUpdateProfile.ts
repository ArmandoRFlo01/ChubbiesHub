const User = require('../models/User');

export const updateProfile = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Find the user by ID
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    // Save the updated user
    await user.save();

    // Return the updated user without the password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
