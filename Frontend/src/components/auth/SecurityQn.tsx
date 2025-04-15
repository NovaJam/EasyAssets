import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SecurityQuestion, SecurityQuestionAnswer } from "../../types/auth";
import { mockQuestions } from "../../Mock/mockQuestions";



const SecurityQn = () => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Will be fetched from API in a real implementation
    const questions: SecurityQuestion[] = mockQuestions;

    const validateAnswers = (): boolean => {
        const newErrors: { [key: number]: string } = {};
        let isValid = true;

        questions.forEach((q) => {
            const answer = answers[q.id] || "";
            if (!answer.trim()) {
                newErrors[q.id] = "Answer is required";
                isValid = false;
            } else if (answer.trim().length < 2) {
                newErrors[q.id] = "Answer must be at least 2 characters";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAnswers()) {
            toast.error("Please answer all security questions correctly");
            return;
        }

        const questionAnswers: SecurityQuestionAnswer[] = questions.map((q) => ({
            question: q.question,
            answer: answers[q.id] || "",
        }));
        console.log("Data",questionAnswers);
        
        //pass the above questionAnswers to apiCall

        setIsLoading(true);

        try {
            // Simulating API response for demonstration
            const apiResponse = true; // This would come from the actual API response

            if (apiResponse) {
                // Show success toast
                toast.success("Identity verified successfully!", {
                  duration: 2000 // Longer duration to ensure visibility
                });
                
                // Wait for toast to be visible before navigating
                await new Promise((resolve) => setTimeout(resolve, 1000));
                
                // Then navigate
                navigate("/resetPassword", { replace: true, state: { verified: true } });
              } else {
                toast.error("Security answers verification failed. Please try again.");
              }
        } catch (error) {
            let errorMessage = "Failed to verify security questions";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="w-full max-w-lg mx-auto m-4 p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Security Verification</h2>
            <p className="text-gray-600 mb-6 text-center">
                Please answer your security questions to verify your identity
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {questions.map((q) => (
                    <div key={q.id} className="space-y-2">
                        <label htmlFor={`q-${q.id}`} className="block text-sm font-medium text-gray-700">
                            {q.question}
                        </label>

                        <input
                            type="text"
                            id={`q-${q.id}`}
                            name={`q-${q.id}`}
                            value={answers[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            className={`w-full p-3 border ${errors[q.id] ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Your answer"
                            disabled={isLoading}
                        />
                        {errors[q.id] && (
                            <p className="mt-1 text-sm text-red-500">{errors[q.id]}</p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md mt-6 text-white font-medium transition ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </span>
                    ) : (
                        "Verify Identity"
                    )}
                </button>
            </form>
        </div>
    );
};

export default SecurityQn;