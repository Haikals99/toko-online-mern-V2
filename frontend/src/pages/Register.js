import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      // Simpan user dan token ke localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      setSuccess('Registrasi berhasil! Mengalihkan...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100vh-200px)] py-xl">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="w-full max-w-[480px] px-gutter relative z-10">
        <div className="bg-white/80 backdrop-blur-md shadow-[0px_10px_40px_rgba(0,0,0,0.06)] rounded-xl p-md md:p-lg border border-white/40">
          <header className="text-center mb-lg">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Create Account</h1>
            <p className="text-on-surface-variant font-body-md text-body-md">Join our curated marketplace today.</p>
          </header>
          
          {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4 text-center font-body-md">{error}</div>}
          {success && <div className="bg-secondary-container text-on-secondary-container p-3 rounded-lg mb-4 text-center font-body-md">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-md">
            <div className="space-y-xs">
              <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant ml-1" htmlFor="name">FULL NAME</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary transition-all outline-none text-body-md" 
                id="name" 
                placeholder="Jane Doe" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant ml-1" htmlFor="email">EMAIL ADDRESS</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary transition-all outline-none text-body-md" 
                id="email" 
                placeholder="jane@example.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-xs">
                <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant ml-1" htmlFor="password">PASSWORD</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary transition-all outline-none text-body-md" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-sm-caps text-label-sm-caps text-on-surface-variant ml-1" htmlFor="confirm_password">CONFIRM</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 focus:border-primary transition-all outline-none text-body-md" 
                  id="confirm_password" 
                  placeholder="••••••••" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary-container" id="terms" type="checkbox" required/>
              <label className="text-[14px] text-on-surface-variant" htmlFor="terms">I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a></label>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-button text-button py-4 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all mt-4" type="submit">
              Create Account
            </button>
          </form>

          <div className="mt-lg pt-md border-t border-outline-variant/30 flex flex-col items-center gap-4">
            <p className="text-on-surface-variant font-body-md text-body-md">
              Already have an account? <Link className="text-primary font-semibold hover:underline ml-xs" to="/login">Login</Link>
            </p>
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="font-label-sm-caps text-label-sm-caps text-on-surface-variant">OR REGISTER WITH</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-2 gap-md w-full">
              <button className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-2 hover:bg-surface-container transition-colors active:scale-95">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUollRq2FoIgO_bvqrC4oDByrF-9hcvgxjVPcpOF5gNHzPqCwa9nIyJA03L17BVJqCdLojPSJUBgB_DQghEQV7iP_ZzV9VRbyL5Y7NObmMSAdbXkZpbOnOmPx9Hz0dp0WpaqrEnkrFQkk8kavkVeBS1wdU1Xma1dVSa8-6Zg9ePTLsEFzsjIbz2sKQB9fQmcrtDT-Z27HoHyIdwFXrNxyUO8YDrzvfEkw_Je2p3wXXbs6nlzY_mvTq63SJ_jC-nrurpRfxs_9ZDL8"/>
                <span className="font-button text-button text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 border border-outline-variant rounded-lg py-2 hover:bg-surface-container transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[20px]">brand_family</span>
                <span className="font-button text-button text-on-surface">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;