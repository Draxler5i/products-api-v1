const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Misssing field(s), all are required' });
    }
    const result = await authService.register({ name, email, password });
    res.status(201).json({
      message: 'User registered success',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error('Error registering user. ', error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await authService.login(email, password);
    res.status(200).json({
      message: 'Login success',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error('Error login. ', error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};
