import { Router } from "express";
import {getStudents,deletestudent,updatestudent,createStudent,getStudentById} from "../controllers/studentControllers"

const router = Router();

router.get("/",getStudents);
router.get("/:id",getStudentById);
router.post("/",createStudent);
router.put("/:id",updatestudent);
router.delete("/:id",deletestudent);



export default router;