import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDefaultSecurityQuestions, saveSecurityQuestions } from '../../services/auth.service';
import { SecurityQuestion, SecurityQuestionAnswerRequest } from "../../types/auth";
import { Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AskSecurityQn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = location?.state?.email;
    const [defaultQuestions, setDefaultQuestions] = useState<SecurityQuestion[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [responses, setResponses] = useState<SecurityQuestionAnswerRequest>({
        securityQuestion1: "",
        answer1: "",
        securityQuestion2: "",
        answer2: ""
    });
    const [errors, setErrors] = useState({
        question1: "",
        answer1: "",
        question2: "",
        answer2: ""
    });

    useEffect(() => {
        const getDefaultSecurityQuestions = async () => {
            try {
                setIsLoading(true);
                const questions = await fetchDefaultSecurityQuestions();
                setDefaultQuestions(questions);
            } catch (error) {
                console.error("Failed to fetch security questions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getDefaultSecurityQuestions();
    }, []);

    const handleChange = (field: keyof typeof responses, value: string) => {
        setResponses(prev => ({ ...prev, [field]: value }));
        if (field === "securityQuestion1") setErrors(prev => ({ ...prev, question1: "" }));
        if (field === "answer1") setErrors(prev => ({ ...prev, answer1: "" }));
        if (field === "securityQuestion2") setErrors(prev => ({ ...prev, question2: "" }));
        if (field === "answer2") setErrors(prev => ({ ...prev, answer2: "" }));
    };

    const callSaveAPI = async (request: SecurityQuestionAnswerRequest) => {
        try {
            setIsLoading(true);
            await saveSecurityQuestions(request);
            setIsLoading(false);
            toast.success('Signup completed successfully!', { duration: 2000 });
            setTimeout(() => {
                navigate('/signup', { replace: true, state: { answered: true } });
              }, 2000);
        } catch (error: any) {
            toast.error(error.message || 'Failed to signup. Try again later', { duration: 2000 });
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {
            securityQuestion1,
            answer1,
            securityQuestion2,
            answer2
        } = responses;

        const newErrors = {
            question1: "",
            answer1: "",
            question2: "",
            answer2: ""
        };

        let hasError = false;

        if (!securityQuestion1) {
            newErrors.question1 = "Please select the first security question.";
            hasError = true;
        }
        if (!securityQuestion2) {
            newErrors.question2 = "Please select the second security question.";
            hasError = true;
        }
        if (securityQuestion1 && securityQuestion1 === securityQuestion2) {
            newErrors.question2 = "Security questions must be different.";
            hasError = true;
        }
        if (!answer1.trim()) {
            newErrors.answer1 = "Please provide an answer.";
            hasError = true;
        }
        if (!answer2.trim()) {
            newErrors.answer2 = "Please provide an answer.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }
        const request = {
            email:userEmail,
            securityQuestion1,
            answer1,
            securityQuestion2,
            answer2
        };
        await callSaveAPI(request);
    };

    const SecurityShieldSVG = () => (
        <div className="flex justify-center items-center">
            <svg viewBox="0 0 200 200" className="w-full max-w-md">
                <g className="animate-pulse">
                    <path
                        d="M100,20 L40,50 L40,110 C40,140 65,170 100,180 C135,170 160,140 160,110 L160,50 L100,20 Z"
                        fill="#E6F7FF"
                        stroke="#1D4ED8"
                        strokeWidth="4"
                    />
                    <path
                        d="M100,40 L60,60 L60,110 C60,130 80,150 100,160 C120,150 140,130 140,110 L140,60 L100,40 Z"
                        fill="#BFDBFE"
                        stroke="#2563EB"
                        strokeWidth="3"
                    />
                    <circle cx="100" cy="100" r="25" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
                    <path
                        d="M90,100 L95,105 L110,90"
                        fill="none"
                        stroke="#1E40AF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </svg>
        </div>
    );

    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto px-4 py-5">
                    <div className="px-6 py-4">
                        <div className="flex flex-col items-center gap-1 sm:gap-2">
                            <h1 className="text-2xl font-medium text-gray-800">Just one step ahead:</h1>
                            <p className="text-lg text-gray-800">Answer security questions to complete your account setup</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl shadow-lg overflow-hidden">
                        <div className="flex lg:gap-20 flex-col md:flex-row">

                            <div className="hidden md:w-1/2 p-8 md:flex items-center justify-center">
                                <div className="max-w-md">
                                    <div className="text-center mt-6">
                                        <h2 className="text-xl font-semibold text-blue-800 mb-2">Protect Your Account</h2>
                                        <p className="text-blue-600">Security questions help us verify your identity if you need to recover your account.</p>
                                    </div>
                                    <SecurityShieldSVG />
                                </div>
                            </div>

                            <div className="md:w-1/2 p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <Lock size={20} className="mr-2 text-blue-600" />
                                        Security Questions
                                    </h2>
                                    <p className="text-gray-600 mt-1">Choose unique questions and remember your answers</p>
                                </div>

                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                                    </div>
                                ) : defaultQuestions && Array.isArray(defaultQuestions) && defaultQuestions.length > 0 ? (
                                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-5">
                                        <div>
                                            <label className="block mb-2 text-gray-700 font-medium">Security Question 1</label>
                                            <select
                                                className="w-full p-3 border outline-0 border-gray-300 rounded-md md:rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={responses.securityQuestion1}
                                                onChange={(e) => handleChange("securityQuestion1", e.target.value)}
                                            >
                                                <option value="">Select a question</option>
                                                {defaultQuestions
                                                    .filter(q => q.question !== responses.securityQuestion2)
                                                    .map((q, i) => (
                                                        <option key={i} value={q.question}>
                                                            {q.question}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.question1 && (
                                                <p className="text-red-600 text-sm mt-1">{errors.question1}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-gray-700 font-medium">Your Answer</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border outline-0 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={responses.answer1}
                                                onChange={(e) => handleChange("answer1", e.target.value)}
                                                placeholder="Enter your answer"
                                            />
                                            {errors.answer1 && (
                                                <p className="text-red-600 text-sm mt-1">{errors.answer1}</p>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200 pt-5 mt-5"></div>

                                        <div>
                                            <label className="block mb-2 text-gray-700 font-medium">Security Question 2</label>
                                            <select
                                                className="w-full p-3 outline-0 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={responses.securityQuestion2}
                                                onChange={(e) => handleChange("securityQuestion2", e.target.value)}
                                            >
                                                <option value="">Select a question</option>
                                                {defaultQuestions
                                                    .filter(q => q.question !== responses.securityQuestion1)
                                                    .map((q, i) => (
                                                        <option key={i} value={q.question}>
                                                            {q.question}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.question2 && (
                                                <p className="text-red-600 text-sm mt-1">{errors.question2}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-gray-700 font-medium">Your Answer</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border outline-0 border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                value={responses.answer2}
                                                onChange={(e) => handleChange("answer2", e.target.value)}
                                                placeholder="Enter your answer"
                                            />
                                            {errors.answer2 && (
                                                <p className="text-red-600 text-sm mt-1">{errors.answer2}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                            disabled={
                                                !responses.securityQuestion1 ||
                                                !responses.securityQuestion2 ||
                                                responses.securityQuestion1 === responses.securityQuestion2 ||
                                                !responses.answer1.trim() ||
                                                !responses.answer2.trim()
                                            }
                                        >
                                            Complete Signup
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600">Unable to load security questions. Please try again later.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AskSecurityQn;