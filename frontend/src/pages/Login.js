import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://toko-online-mern-v2-production.up.railway.app/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-gutter pt-xl pb-xl bg-surface-container-low min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-[440px] bg-surface-container-lowest p-xl rounded-xl shadow-[0px_10px_40px_rgba(0,0,0,0.06)] border border-outline-variant/10">
        <div className="text-center mb-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-base">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Please enter your details to sign in.</p>
        </div>
        
        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4 text-center font-body-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-base">
            <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email Address</label>
            <input 
              className="w-full px-md py-sm border border-outline-variant bg-surface rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md" 
              id="email" 
              placeholder="name@company.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-base">
            <div className="flex justify-between items-center">
              <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
              <a className="font-button text-button text-primary hover:underline" href="#">Forgot?</a>
            </div>
            <input 
              className="w-full px-md py-sm border border-outline-variant bg-surface rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-body-md text-body-md" 
              id="password" 
              placeholder="••••••••" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-sm pt-base">
            <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox"/>
            <label className="font-body-md text-body-md text-on-surface-variant select-none" htmlFor="remember">Remember for 30 days</label>
          </div>
          <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-button text-button py-md rounded-lg shadow-[0px_10px_40px_rgba(0,0,0,0.06)] hover:opacity-90 active:scale-[0.98] transition-all" type="submit">
            Login
          </button>
          
          <div className="pt-md text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Don't have an account? 
              <Link className="text-primary font-semibold hover:underline ml-xs" to="/register">Create an Account</Link>
            </p>
          </div>
        </form>

        <div className="mt-xl pt-lg border-t border-outline-variant/30">
          <div className="flex items-center justify-center gap-md">
            <button className="flex-1 flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors active:scale-95">
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUFHRPqJAc0tVwgZRqtibd4idMOuSPwY1xyjsu2qsVcDu0URdH3jWVf-IWi-uVaekj5UcAscdP_ZqFujt41M1PQnibsRYM-YbYlaQYyiMylCcAp__SJes5d4S0WAX9_AEXBe9HgnzhxUxbBWa4Rn6p4uqNi8E9FDGs1rD9FKP177UYsdvoFxzQvLHIj8uh1vWs2d64f7-nSUb_ofMoU230MpBNQaYK9IJzY_sHI6ctgPHGiegePwxR56SQHtvRNurF2SubV2XZga4"/>
              <span className="font-button text-button text-on-surface">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors active:scale-95">
              <span className="material-symbols-outlined text-on-surface">brand_family</span>
              <span className="font-button text-button text-on-surface">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;