export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUsername = (username) => {
    const usernameRegex = /^(?!.*\.\.)(?!.*\.\d)(?!.*\d\.)(?!.*__)(?!.*\._)(?!.*_\.)[a-zA-Z0-9._]+$/;
    return usernameRegex.test(username);
};

export const validateName = (name) => {
    const nameRegex = /^(?!.*--)(?!.*\s\s)[a-zA-Z\s-]+$/;
    return nameRegex.test(name);
};