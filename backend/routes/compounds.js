const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getCompounds,
  getCompound,
  addCompound,
  updateCompound,
  deleteCompound,
} = require("../controller/compounds");

const router = Router();

router.get("/", getCompounds);
router.get("/:id", getCompound);
router.post("/", authMiddleware, addCompound);
router.put("/:id", authMiddleware, updateCompound);
router.delete("/:id", authMiddleware, deleteCompound);

module.exports = router;
