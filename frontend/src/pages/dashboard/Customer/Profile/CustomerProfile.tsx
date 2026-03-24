import React, { useState } from 'react';

type Profile = { fullName: string; email: string; phone: string; address: string; wallet: string; };
type ProfileErrors = { fullName?: string; phone?: string; address?: string; };

const initialProfile: Profile = { fullName: '', email: '', phone: '', address: '', wallet: '' };

const CustomerProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (field: keyof Profile, value: string): string => {
    if (field === 'fullName' && !value) return 'Full name is required.';
    if (field === 'phone' && !/^\d{10,}$/.test(value)) return 'Enter a valid phone number.';
    if (field === 'address' && !value) return 'Address is required.';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value } as Profile);
    setErrors({ ...errors, [name]: validate(name as keyof Profile, value) });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ProfileErrors = {};
    (Object.keys(profile) as Array<keyof Profile>).forEach((field) => {
      if (field !== 'email' && field !== 'wallet') {
        const error = validate(field, profile[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const inputBase = "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3.5 text-white text-base transition-all box-border focus:outline-none focus:border-[#00DAC1] focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(0,218,193,0.1)]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white relative overflow-hidden font-sans">
      {/* Decorative glows */}
      <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(rgba(0,218,193,0.4),rgba(0,218,193,0))] top-[-250px] right-[-100px] z-0 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-[conic-gradient(from_180deg_at_50%_50%,#16abff33_0deg,#0885ff33_55deg,#54d6ff33_120deg,#0071ff33_160deg,transparent_360deg)] bottom-[-300px] left-[-200px] z-0 pointer-events-none" />

      <form
        className="bg-[rgba(20,20,20,0.7)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-10 w-full max-w-[480px] z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] flex flex-col gap-5 sm:p-8 sm:rounded-none sm:h-screen sm:justify-center"
        onSubmit={handleSave}
      >
        <h2 className="text-[2rem] font-bold mb-2 bg-[linear-gradient(135deg,#fff_0%,#00DAC1_100%)] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center mt-0">
          Customer Profile
        </h2>

        {[
          { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name', error: errors.fullName },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'Email', error: undefined, disabled: true },
          { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'Enter phone number', error: errors.phone },
          { label: 'Delivery Address', name: 'address', type: 'text', placeholder: 'Enter delivery address', error: errors.address },
        ].map(({ label, name, type, placeholder, error, disabled }) => (
          <div key={name} className="flex flex-col gap-2">
            <label className="text-[0.85rem] font-medium text-[rgba(255,255,255,0.6)] ml-1">{label}</label>
            <input
              name={name}
              type={type}
              value={profile[name as keyof Profile]}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              className={`${inputBase} ${error ? 'border-[#FF4D4D]' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
            {error && <span className="text-[#FF4D4D] text-[0.85rem] mt-1 ml-1">{error}</span>}
          </div>
        ))}

        <div className="mb-3">
          <label className="font-medium text-[rgba(255,255,255,0.6)] text-sm">Connected Wallet</label>
          <div className="mt-1.5 px-3 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-white font-mono text-[0.98rem] border border-[rgba(255,255,255,0.1)]">
            {profile.wallet || 'Not Connected'}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-3 bg-[linear-gradient(135deg,#00DAC1_0%,#008B7B_100%)] text-black border-none rounded-xl py-4 text-base font-bold cursor-pointer transition-all flex items-center justify-center gap-2 hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_4px_15px_rgba(0,218,193,0.4)] active:not-disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CustomerProfile;
