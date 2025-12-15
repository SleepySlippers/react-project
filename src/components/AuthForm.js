import { useState } from 'react';

const AuthForm = ({ authorize, register }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [waitVerification, setWaitVerification] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    const action = isLogin ? authorize : register ;
    setError('');
    setWaitVerification(true);
    action(formData.username, formData.password)
      .then(() => {
        setWaitVerification(false)
        setIsLogin(true);
      })
      .catch(err => {
        setWaitVerification(false);
        setError(err);
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <form>
        <div style={{ marginBottom: 15 }}>
          <label>Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={{ width: '100%', padding: 10, marginTop: 5, boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ width: '100%', padding: 10, marginTop: 5, boxSizing: 'border-box' }}
            required
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button
          disabled={waitVerification}
          onClick={handleSubmit}
          type="submit"
          style={{ width: '100%', padding: 12, background: '#007bff', color: 'white', border: 'none' }}
        >
          { waitVerification ? 'Verifing...' :
            isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 20 }}>
        {isLogin ? "Don't have an account? " : 'Have account? '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#007bff' }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;

