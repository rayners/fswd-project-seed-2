import express from 'express';
import passport from '../passport';

const router = express.Router();

// router.get('/', (request, response) => {
// });

router.get('/isLoggedIn', (request, response) => {
    if (request.user) {
        response.json(request.user);
    } else {
        response.sendStatus(401);
    }
});

router.post('/canRegister', (request, response) => {
    const User = request.app.locals.models.User;
    User.findOne({ where: { username: request.body.username }})
        .then(user => response.json(!user));
});

router.post('/register', (req, res) => {
    const User = req.app.locals.models.User;
    if (req.body.password !== req.body.password_confirm) {
        res.format({
          html: () => res.end('Passwords must match'),
          json: () => res.status(400).json({ error: 'Passwords must match' })
        });
      } else {
        User.findOne({ where: { username: req.body.username }})
          .then(function(existingUser) {
            if (existingUser) {
              res.format({
                html: function() {
                  res.end('User already exists')
                },
                json: function() {
                  res.status(400).json({ error: 'User already exists '});
                }
              })
            } else {
              User.create(req.body).then(function(user) {
                req.session.user_id = user.id;
                req.session.save(function() {
                  res.format({
                    html: function() {
                      res.redirect('/');
                    },
                    json: function() {
                      req.login(user, () => res.json(user))
                    }
                  });
                });
              });
            }
          });
      }    
});

router.post('/login', (request, response, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { next(err); }
    if (!user) { response.status(401).json(info); }
    else {
      request.login(user, (err) => {
        if (err) { next(err); }
        else { response.json(user); }
      });
    }
  })(request, response, next);
});

router.post('/logout', (request, response) => {
  request.logout();
  response.json(true);
})

export default router;