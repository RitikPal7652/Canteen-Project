const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <h1 className="logo">CanteenApp</h1>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
