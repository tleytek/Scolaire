Passport.js for Scholaire

- To run, first do CREATE & USE db (from schema.sql)
- Next, run "nodemon server.js" in terminal
- Again in terminal run "sequelize db:seed:all", and then nodemon again
- Log in as admin ("1@gmail.com" and then "1"), same as from the seed
- Press generate Key
- Logout, then signup as a teacher
- Should be able to log in, in console will say if validated or not, then it'll give you option to enter key
- Key will then be compared with what's generated in admin
- If it works, admin's "key" gets refreshed, and teacher becomes "validated" in db
