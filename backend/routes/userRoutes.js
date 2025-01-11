const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");



router.get('/login/:email', async (req,res) =>{
  try {
     email = req.params.email;

     const student = await User.findById(email);
     res.send(email);

  } catch (error) {
    console.log(error)
  }
})

router.post('/dashboard', async (req, res) => {
  try {
    const { email, password } = req.body;
    const ema= req.params.ema ;


    // Find the user in the database by studentID
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send('<script>alert("Invaild email"); window.location.href = "/login.html"; </script>');
    }

    // Check if password is correct using the comparePassword method
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.send('<script>alert("Invaild Password"); window.location.href = "/login.html"; </script>');
    }

    // Generate a JWT token if login is successful
    res.redirect('/.html')

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});















module.exports = router;
