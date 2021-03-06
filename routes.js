const multer  = require('multer');
const upload = multer({
  dest: './uploads/'
});
module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const neiController = require('./controllers/nei')(allModels);


//Equipment
    app.get('/equipment', neiController.equipment);
    app.get('/equipment/:name', neiController.singleEquipment);

//Vessel
    app.get('/vessel', neiController.vessel);
    app.get('/vessel/:name', neiController.singleVessel);

//Chat
    app.get('/chat', neiController.chat);

//Reply
    app.post('/activity/:id/reply/',upload.single('reply_upload'), neiController.newReply);
    app.put('/activity/:id/reply/:reply_id/edit', neiController.editReply);
    app.delete('/activity/:id/reply/:reply_id', neiController.deleteReply);
    app.put('/activity/:id/reply/:reply_id/mark/edit', neiController.markAsSolution);
    app.put('/activity/:id/reply/:reply_id/unmark/edit', neiController.unmarkAsSolution);

//Question
    app.get('/activity/new', neiController.newPost);
    app.post('/activity/new', neiController.postNewPost);
    app.get('/activity/:id', neiController.question)
    app.put('/activity/:id/edit', neiController. editQuestion);
    app.delete('/activity/:id', neiController.deleteQuestion);

//Root
    app.post('/login', neiController.loginPost);
    app.post('/register', neiController.registerPost);
    app.get('/logout', neiController.logout);
    app.get('/', neiController.root);
    app.get('/home', neiController.home);

};