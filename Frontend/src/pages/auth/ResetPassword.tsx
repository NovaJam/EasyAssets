import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import { Toaster } from 'react-hot-toast';

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserVerified = location.state?.verified;

  useEffect(() => {
    if (!isUserVerified) {
      // Redirect back if not verified
      navigate("/security-check", { replace: true });
    }
  }, [isUserVerified, navigate]);

  if (!isUserVerified) return null;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <ResetPasswordForm />
      </div>
      <Toaster position="top-right" toastOptions={{
        duration: 2000,
      }} />
    </>
  );
}

export default ResetPassword;
