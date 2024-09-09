import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp forceRedirectUrl="/new-user" fallbackRedirectUrl="/new-user" />
    </div>
  );
};

export default SignUpPage;
