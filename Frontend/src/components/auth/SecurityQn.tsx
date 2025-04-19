import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import { SecurityQuestion } from "../../types/auth";
import { getSchema } from "../../validators/auth.validator";
import { fetchUserSecurityQuestions, verifySecurityAnswers } from "../../services/auth.service";

const SecurityQn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<SecurityQuestion[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchQuestions = async () => {
    setIsLoadingQuestions(true);
    try {
      const data = await fetchUserSecurityQuestions(email);
      setQuestions([
        { id: 1, question: data.question1 },
        { id: 2, question: data.question2 },
      ]);
      toast.success("Security questions loaded!");
    } catch (err) {
      toast.error("Failed to fetch questions. Try again.");
      setQuestions(null);
    } finally {
      setIsLoadingQuestions(false);
    }
  };
  
  const mutation = useMutation({
    mutationFn: verifySecurityAnswers,
    onSuccess: () => {
      toast.success("Identity verified!");
      navigate("/resetPassword", { replace: true, state: { verified: true } });
    },
    onError: () => {
      toast.error("Answers are incorrect. Please try again.");
    },
  });
  
  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questions) return;

    const schema = getSchema(questions);
    const result = schema.safeParse(
      Object.fromEntries(Object.entries(answers).map(([k, v]) => [k.toString(), v]))
    );

    if (!result.success) {
      const fieldErrors: Record<number, string> = {};
      for (const key in result.error.flatten().fieldErrors) {
        const message = result.error.flatten().fieldErrors[key]?.[0];
        if (message) fieldErrors[parseInt(key)] = message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutation.mutate({
      email,
      answer1: answers[1] || "",
      answer2: answers[2] || "",
    });
  };

  const handleContinue = () => {
    const isValid = validateEmail(email);
    if (!isValid) {
      toast.error("Please enter a valid email");
      return;
    }
    fetchQuestions();
  };
  

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <div className="max-w-xl mx-auto mt-10 p-6">
        {!questions ? (
          <>
            <h1 className="text-lg text-gray-800 font-medium mb-4">Please enter a valid email to load your security questions.</h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="e.g. user@example.com"
              />
              <button
                onClick={handleContinue}
                disabled={isLoadingQuestions}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {"Continue"}
              </button>
          </>
        ) : (
          <div>
            <h1 className="text-xl font-semibold text-gray-900 text-center mb-4">Verify your identity by answering these questions</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {questions.map((q) => (
                <div key={q.id}>
                  <label className="block mb-1 text-sm font-medium">{q.question}</label>
                  <input
                    type="text"
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    className={`w-full p-2 border ${errors[q.id] ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                  {errors[q.id] && <p className="text-red-500 text-sm">{errors[q.id]}</p>}
                </div>
              ))}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {mutation.isPending ? "Verifying..." : "Submit Answers"}
              </button>
            </form>

          </div>
        )}
      </div>
    </>
  );
};

export default SecurityQn;
