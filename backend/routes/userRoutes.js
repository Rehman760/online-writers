const express = require("express");
const router = express.Router();
const {
  allUsers,
  editUser,
  deleteUser,
  createUserJobsHistory,
  createUser,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//user routes

// /api/allusers
router.get("/allusers", isAuthenticated, isAdmin, allUsers);
// /api/user/id
// router.get("/user/info", isAuthenticated, singleUser);
// /api/user/edit/id
router.post("/create/user", isAuthenticated, isAdmin, createUser);
router.put("/user/edit/:id", isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);
// /api/user/jobhistory
router.post("/user/jobhistory", isAuthenticated, createUserJobsHistory);

module.exports = router;
