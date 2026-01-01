import { Request, Response } from "express";
import prisma from '../config/prisma'


export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params; //Destructuring
    try {
        const student = await prisma.student.findUnique({
            where: { id: parseInt(id) },
            include: {
               enrollments: true,
            },
        });
        if (!student) {
            res.status(404).json({ error: "student not found" });
            return;
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to database" });
    }
};
export const getStudents = async (req : Request , res : Response)=>{
try{
  const students = await prisma.student.findMany({
            include: {
                enrollments : true,
            },
});
res.status(200).json(students);
}catch (error){
 res.status(500).json({ error: "Failed to get student" });
}};
export const createStudent = async (req : Request , res : Response)=>{
const { name,email,deptId } = req.body;
    try{
        const newStudent = await prisma.student.create({
            data: { name,email,deptId },
        });res.status(201).json({newStudent,
            message: "student created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create student" });
    }
}
export const updatestudent = async (req: Request, res: Response) => {
   const  {id} = req.body;
    const { name,email,deptId } = req.body;
    try {
        const updateStudent = await prisma.student.update({
            where: { id: parseInt(id) },
          data: { name,email,deptId}
        });
        res.status(200).json(updateStudent);
    } catch (error) {
        res.status(500).json({ error: "Failed to update student" });
    }
};
export const deletestudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.student.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send({message: "student deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
};