const express           =           require('express');
const router            =           express.Router();
const gravatar          =           require('gravatar'); 
const bcrypt            =           require('bcryptjs');        
const   {check,validationResult}        =   require('express-validator');

const User      =       require('../../models/User');

//@route            GET api/users
//@desc             Test route
//@access           Public(means we dont need a token for this)
router.post(
    '/', 
[
 check('name','Name is Required').not().isEmpty()  ,
 check('email','Please include a valid email ').isEmail(),
 check('password','Please enter a password with 6 or more characters ').isLength({min : 6})
],
async (req,res) =>  {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()}); 
    }

    const {name,email,password}     =   req.body;
    try {
        let user                  =           await User.findOne({email});

        //See if user exists
        if(user){
            res.status(400).json({errors : [{msg : 'User already exists'}]})
        }
    
        //Get users gravatar
       const avatar              =          gravatar.url(email, {
           s : '200',
           r: 'pg',
           d : 'mn'
       })

       user                      =          new User({
                                                name,
                                                email,
                                                avatar,
                                                password
                                            })

        //Encryt password

        const salt      =       await bcrypt.genSalt(10);

        user.password   =       await bcrypt.hash(password,salt);

        //to save user in database
        await user.save();

        //Return jsonwebtoken

        res.send('User succesfully registered')
    } catch (err) {
      console.error(err)
    }


    
});

module.exports      =       router;