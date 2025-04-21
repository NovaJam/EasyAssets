import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ResetPasswordFormValues, resetPasswordSchema } from "../../types/auth";
import { resetPassword } from '../../services/auth.service';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    email: '',
    newPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<ResetPasswordFormValues>>({});

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully!', { duration: 1500 });

      setFormValues({ email: '', newPassword: '' });

      setTimeout(() => {
        navigate("/", { replace: true, state: { verified: true } });
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reset password. Please try again.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsed = resetPasswordSchema.parse(formValues);
      setErrors({});
      mutation.mutate(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<ResetPasswordFormValues> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ResetPasswordFormValues;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
        toast.error('Please correct the form errors');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
    
    <div className="max-w-md w-full mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md pr-10 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
          </p>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md disabled:bg-blue-300"
        >
          {mutation.isPending ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ResetPasswordForm;