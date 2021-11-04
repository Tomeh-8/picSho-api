const jwt = require("jsonwebtoken");

const secret = 'access';

const auth = async (req, res, next) => {
   try {
     
     const token = req.headers.authorization.split(" ")[1];
     console.log(token);
     let result;

     if (token) {      
       result = jwt.verify(token, "access");
       req.userId = result?.id;

     } else {
       result = jwt.decode(token);

       req.userId = result?.sub;
     }    

     next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;