function UserAnPass() {
    return (
      <div className="input-container">
        {/* Input pentru Username */}
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            className="input-box"
            placeholder="Enter your username"
          />
        </div>
  
        {/* Input pentru Password */}
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            className="input-box"
            placeholder="Enter your password"
          />
        </div>
      </div>
    );
  }
  
  export default UserAnPass;