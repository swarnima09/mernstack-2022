const express           =           require('express');
const router            =           express.Router();

//@route            GET api/profile
//@desc             Test route
//@access           Public(means we dont need a token for this)
router.get('/',(req,res) => res.send('Profile route'));

module.exports      =       router;