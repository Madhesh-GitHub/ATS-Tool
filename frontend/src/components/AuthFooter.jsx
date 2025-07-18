import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => (
  <>
    <p className="text-center text-sm mt-4 text-gray-500">
      Already have an account?{' '}
      <Link to="/login" className="text-indigo-600 hover:underline font-medium">
        Log in
      </Link>
    </p>
    <hr className="my-6 border-gray-200" />
    <div className="mt-6 text-sm text-gray-500">
      <p className="mb-2 font-medium text-center">By signing up, you’ll get access to:</p>
      <div className="grid grid-cols-2 gap-2 text-gray-900">
        <span>✅ ATS Score Analysis</span>
        <span>✅ Resume Templates</span>
        <span>✅ Keyword Optimization</span>
        <span>✅ Format Suggestions</span>
      </div>
    </div>
  </>
);

export default AuthFooter;
