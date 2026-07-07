import api from "./api";

/* ==========================================
   STORAGE KEYS
========================================== */

const TOKEN_KEY = "tamilbuzz_token";

const USER_KEY = "tamilbuzz_user";


/* ==========================================
   LOGIN
========================================== */

export const login = async (email, password) => {

    const { data } = await api.post("/auth/login", {

        email,

        password

    });

    if (data.token) {

        localStorage.setItem(

            TOKEN_KEY,

            data.token

        );

    }

    if (data.user) {

        localStorage.setItem(

            USER_KEY,

            JSON.stringify(data.user)

        );

    }

    return data;

};


/* ==========================================
   REGISTER
========================================== */

export const register = async (user) => {

    const { data } = await api.post(

        "/auth/register",

        user

    );

    return data;

};


/* ==========================================
   LOGOUT
========================================== */

export const logout = () => {

    localStorage.removeItem(TOKEN_KEY);

    localStorage.removeItem(USER_KEY);

};


/* ==========================================
   TOKEN
========================================== */

export const getToken = () => {

    return localStorage.getItem(

        TOKEN_KEY

    );

};

export const isAuthenticated = () => {

    return !!localStorage.getItem(

        TOKEN_KEY

    );

};


/* ==========================================
   USER
========================================== */

export const getCurrentUser = () => {

    const user = localStorage.getItem(

        USER_KEY

    );

    return user ? JSON.parse(user) : null;

};

export const updateCurrentUser = (user) => {

    localStorage.setItem(

        USER_KEY,

        JSON.stringify(user)

    );

};


/* ==========================================
   PROFILE
========================================== */

export const getProfile = async () => {

    const { data } = await api.get(

        "/auth/profile",

        {

            headers: {

                Authorization:

                    `Bearer ${getToken()}`

            }

        }

    );

    return data;

};

export const updateProfile = async (profile) => {

    const { data } = await api.put(

        "/auth/profile",

        profile,

        {

            headers: {

                Authorization:

                    `Bearer ${getToken()}`

            }

        }

    );

    return data;

};


/* ==========================================
   PASSWORD
========================================== */

export const changePassword = async (

    oldPassword,

    newPassword

) => {

    const { data } = await api.put(

        "/auth/change-password",

        {

            oldPassword,

            newPassword

        },

        {

            headers: {

                Authorization:

                    `Bearer ${getToken()}`

            }

        }

    );

    return data;

};


/* ==========================================
   DELETE ACCOUNT
========================================== */

export const deleteAccount = async () => {

    const { data } = await api.delete(

        "/auth/delete",

        {

            headers: {

                Authorization:

                    `Bearer ${getToken()}`

            }

        }

    );

    logout();

    return data;

};