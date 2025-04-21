import { SecurityQuestion } from "../../models/User/SecurityQuestionmodel";

export const countDocuments = async() => {
    return await SecurityQuestion.countDocuments();
}

export const insertQuestions = async(questions:string[]) => {
    return await SecurityQuestion.insertMany(
        questions.map((q) => ({question:q}))
    );
}

export const getAllQuestions = async() => {
    return await SecurityQuestion.find({},'question');
}