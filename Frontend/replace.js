const fs = require('fs');
const path = require('path');
const files = [
  'src/components/SignUp.jsx', 'src/components/ProtectedRoute.jsx',
  'src/components/Navbar.jsx', 'src/components/Login.jsx',
  'src/components/Cart.jsx', 'src/components/Admin.jsx'
];
files.forEach(f => {
  const p = path.join(__dirname, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/http:\/\/localhost:3000\//g, '/api/');
  fs.writeFileSync(p, c);
});
console.log('Replaced URLs successfully.');
