import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState } from "./Users.types";
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk("users/fetch", async (thunkAPI) => {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    return response;
});

const initialState: UserState = {
    users: [],
    randomUsers: [],
    userAdded: false,
    counts: 0,
    text: "",
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: {
            reducer(state, action: PayloadAction<User>) {
                state.users.push(action.payload);
                state.userAdded = true;
            },
            prepare(user: User) {
                const id = Math.random().toString(36).substring(7);
                return { payload: { ...user, id } };
            },
        },
        userAddedToggle(state, action: PayloadAction<boolean>) {
            state.userAdded = action.payload;
        },
        incrementCounts(state) {
            state.counts++;
        },
        decrementCounts(state) {
            state.counts--;
        },
        mutateCountBy(state, action: PayloadAction<number>) {
            state.counts += action.payload;
        },
        reset(state) {
            state.counts = 0;
        },
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.randomUsers = [];
            state.randomUsers = action.payload.data.results;
            toast.success("Random Users Fetched");
        });
    },
});

export const {
    addUser,
    incrementCounts,
    decrementCounts,
    mutateCountBy,
    reset,
    setText,
    userAddedToggle,
} = userSlice.actions;
export default userSlice.reducer;
