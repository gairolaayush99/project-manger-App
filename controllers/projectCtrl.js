const Projects = require('../models/projectModel')


const projectCtrl = {
  getProjects: async (req, res) => {
        try {
       
      const projects = await Projects.find({ user_id: req.user.id });
      
        res.json(projects);
        } catch (error) {
            console.log('not working')
      return res.status(500).json({ msg: error.message });
    }
  },
  createProject: async (req, res) => {
    try {
      const { title, content, date } = req.body;

      const newProject = new Projects({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newProject.save();
      res.json({ msg: "working" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProject: async (req, res) => {
      try {
          await Projects.findByIdAndDelete(req.params.id)
          res.json({msg:"Deleted a Project"})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProject: async (req, res) => {
      try {
          const { title, content, date } = req.body;
          await Projects.findByIdAndUpdate({ _id: req.params.id }, {
              title,
              content,
              date
          })
          res.json({msg:"Updated a Note"})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProject: async (req, res) => {
      try {
        const project =await Projects.findById(req.params.id)
        res.json(project)
      } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};



module.exports=projectCtrl