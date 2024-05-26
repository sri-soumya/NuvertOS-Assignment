const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  loginUser,
  getUsers,
  updateUser,
  addUser,
} = require("../controller/users");

router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:id", authMiddleware, updateUser);

module.exports = router;
