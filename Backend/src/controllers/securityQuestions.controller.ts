import { Request, Response } from "express";
import { countDocuments, getAllQuestions, insertQuestions } from "../services/User-Services/securityQuestions.service";

//Used to seed the dataBase with questions
export const insertDefaultSecurityQuestions = async (req: Request, res: Response) => {
    try {
        const existingQuestions = await countDocuments();

        if (existingQuestions > 0) {
            res.status(200).json({ message: 'Security questions already inserted' })
            return;
        }

        const questions = [
            "What is your mother's maiden name?",
            "What was the name of your first pet?",
            "What was your childhood nickname?",
            "In what city were you born?",
            "What is the name of your favorite teacher?",
            "What is your favorite food?",
            "What was the make of your first car?",
            "What high school did you attend?",
            "What is your favorite movie?",
            "What is the name of your best friend in childhood?",
        ];

        const inserted = await insertQuestions(questions);

        res.status(201).json({ message: 'Security questions inserted successfully', count: inserted });
        return;
    } catch (error) {
        console.error('Error inserting security questions ', error);
        res.status(500).json({ message: 'Failed to insert security questions ' });
        return;
    }
}

//Gets the all questions that are available in database to show for a user during signup
export const getAllSecurityQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await getAllQuestions();

        if (questions.length === 0) {
            res.status(200).json({
                message: 'No security questions found',
                questions: [],
            });
            return;
        }

        res.status(200).json({ message: 'Security questions fetched successfully', questions });
        return;
    } catch (error) {
        console.error('Error fetching security questions ', error);
        res.status(500).json({ message: 'Failed to fetch security questions ' });
        return;
    }
}