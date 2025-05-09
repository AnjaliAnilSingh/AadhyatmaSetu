// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: {
//         _id: null,
//         username: null,
//         email: null,
//         isVerified: null,
//     },
//     loading: false,
//     error: null
// };

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             const { _id, username, email, isVerified } = action.payload;
//             state.user._id = _id;
//             state.user.username = username;
//             state.user.email = email;
//             state.user.isVerified = isVerified;
//             state.loading = false;
//             state.error = null;
//         },
//         logout: (state) => {
//             state.user = {
//                 _id: null,
//                 username: null,
//                 email: null,
//                 isVerified: null,
//             };
//             state.loading = false;
//             state.error = null;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         }
//     }
// });

// // Export actions
// export const { login, logout, setLoading, setError } = authSlice.actions;

// // Selectors
// export const selectAuth = (state) => state.auth; // Ensure this matches the key in the store
// export const selectUser = (state) => state.auth.user;
// export const selectUserId = (state) => state.auth.user._id;
// export const selectUserEmail = (state) => state.auth.user.email;
// export const selectIsVerified = (state) => state.auth.user.isVerified;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        _id: null,
        username: null,
        email: null,
        isVerified: null,
        isAdmin: null,
    },
    favorites: [],
    loading: false,
    error: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { _id, username, email, isVerified, favorites, isAdmin } = action.payload;
            state.user._id = _id;
            state.user.username = username;
            state.user.email = email;
            state.user.isVerified = isVerified;
            state.user.isAdmin = isAdmin;
            state.loading = false;
            state.error = null;
            state.favorites = favorites || [];
        },
        logout: (state) => {
            state.user = {
                _id: null,
                username: null,
                email: null,
                isVerified: null,
                isAdmin: null
            };
            state.loading = false;
            state.error = null;
            state.favorites = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        toggleFavorite: (state, action) => {
            const songId = action.payload;
            if (state.favorites.includes(songId)) {
                state.favorites = state.favorites.filter(id => id !== songId);
            } else {
                state.favorites.push(songId);
            }
        }
    }
});

// Export actions
export const { login, logout, setLoading, setError, toggleFavorite } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth; // Ensure this matches the key in the store
export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.user._id;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectIsVerified = (state) => state.auth.user.isVerified;
export const selectIsAdmin = (state) => state.auth.user.isAdmin;
export const selectFavorites = (state) => state.auth.favorites;

export default authSlice.reducer;
