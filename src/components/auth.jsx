import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState(null);

    return (
        <AuthContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const ProtectedRoute = ({ children }) => {
    const { apiKey } = useAuth();

    if (!apiKey) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
