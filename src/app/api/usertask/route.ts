"use client";

import axios from "axios";
import { useFormik } from "formik";
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useToast } from "./ui/use-toast";

const taskSchema = yup.object().shape({
    todo: yup.string().min(5).required("Valid task is required"),
});

const AddTodo = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onTaskAdded = async (values) => {
        try {
            // Send a POST request to the server to add the task
            const response = await axios.post("/api/user/usertask", values);
            console.log(response.data);
            toast({ title: "Task added successfully" });
        } catch (error) {
            console.error("Error adding task:", error);
            toast({ title: "Failed to add task. Please try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: { todo: "" },
        validationSchema: taskSchema,
        onSubmit: onTaskAdded,
    });

    useEffect(() => {
        setIsSubmitting(formik.isValidating || formik.isSubmitting);
    }, [formik.isValidating, formik.isSubmitting]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="todo"
                placeholder="Write your task...."
                value={formik.values.todo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.todo && formik.errors.todo && (
                <div>{formik.errors.todo}</div>
            )}
            <button type="submit" disabled={isSubmitting}>
                Add task {isSubmitting && <BiLoaderAlt className="animate-spin" />}
            </button>
        </form>
    );
};

export default AddTodo;
