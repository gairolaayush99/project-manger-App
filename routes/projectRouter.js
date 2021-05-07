const router = require('express').Router()
const auth = require("../middleware/auth");
const projectCtrl = require("../controllers/projectCtrl");
router.route("/")
  .get(auth, projectCtrl.getProjects)
  .post(auth, projectCtrl.createProject);

router
  .route("/:id")
  .get(auth, projectCtrl.getProject)
  .put(auth, projectCtrl.updateProject)
  .delete(auth, projectCtrl.deleteProject);

    module.exports= router
