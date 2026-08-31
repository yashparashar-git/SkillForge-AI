import "../styles/settings.css";

function Settings() {
    return (
        <div className="settings-page">

            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your SkillForge AI preferences.</p>
            </div>

            {/* Account */}
            <div className="settings-card">
                <h2>👤 Account Settings</h2>

                <label>Name</label>
                <input type="text" />

                <label>Email</label>
                <input type="email" />

                <button>Save Changes</button>
            </div>

            {/* Interview */}
            <div className="settings-card">
                <h2>🎤 Interview Preferences</h2>

                <label>Default Role</label>
                <select>
                    <option>MERN Developer</option>
                    <option>Java Developer</option>
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                </select>

                <label>Difficulty</label>
                <select>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            {/* AI */}
            <div className="settings-card">
                <h2>🤖 AI Preferences</h2>

                <label>Response Style</label>
                <select>
                    <option>Simple</option>
                    <option>Professional</option>
                    <option>Detailed</option>
                </select>
            </div>

            {/* Appearance */}
            <div className="settings-card">
                <h2>🎨 Appearance</h2>

                <label>Theme</label>

                <select>
                    <option>Dark</option>
                    <option>Light</option>
                </select>
            </div>

        </div>
    );
}

export default Settings;