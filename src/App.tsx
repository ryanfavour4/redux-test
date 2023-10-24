/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./store/RootStore";
import {
    addUser,
    decrementCounts,
    fetchUsers,
    incrementCounts,
    mutateCountBy,
    reset,
    setText,
    userAddedToggle,
} from "./store/features/UsersSlice";
import { User } from "./store/features/Users.types";
import toast, { Toast, Toaster } from "react-hot-toast";
import ToastComp from "./components/ToastComp";

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <CounterSimulator />
            <UsersSimulation />
            <RandomUsersSimulation />
        </>
    );
}

export default App;

export function CounterSimulator() {
    const counter = useAppSelector((state) => state.users.counts);
    const text = useAppSelector((state) => state.users.text);
    const dispatch = useAppDispatch();
    return (
        <div className="App">
            <h1 className="">{counter}</h1>
            <button onClick={() => dispatch(incrementCounts())}>
                ADD 1 ++
            </button>
            <button onClick={() => dispatch(decrementCounts())}>
                SUBTRACT 1 --
            </button>
            <div className="">
                <InputSimulator />
                <button
                    onClick={() => dispatch(mutateCountBy(Number(text || 0)))}
                >
                    MUTATE BY {text}
                </button>
            </div>
            <button
                onClick={() => {
                    dispatch(reset());
                    dispatch(setText("0"));
                }}
            >
                Reset
            </button>
        </div>
    );
}

export function InputSimulator() {
    const text = useAppSelector((state) => state.users.text);
    const dispatch = useAppDispatch();

    return (
        <span>
            <input
                type="number"
                value={text}
                onChange={(e) => dispatch(setText(e.target.value))}
            />
        </span>
    );
}

export function UsersSimulation() {
    const users = useAppSelector((state) => state.users.users);
    const userAdded = useAppSelector((state) => state.users.userAdded);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>({
        id: "",
        age: 0,
        name: "",
        number: "",
    });

    useEffect(() => {
        setUser({
            id: "",
            age: 0,
            name: "",
            number: "",
        });
        setTimeout(() => {
            dispatch(userAddedToggle(false));
        }, 500);
    }, [userAdded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="registerArea">
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    value={(user.age > 0 && user.age) || ""}
                    placeholder="Age"
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="number"
                    value={user.number}
                    placeholder="number"
                    onChange={handleChange}
                />
                <div className="">
                    <button
                        onClick={() => {
                            dispatch(addUser(user));
                            toast.custom((t: Toast) => (
                                <ToastComp message="Be Destroyed" t={t} />
                            ));
                        }}
                    >
                        ADD USER
                    </button>
                </div>
            </div>

            <div id="customers">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.number}</td>
                                </tr>
                            ))
                        ) : (
                            <div className="center">
                                <h3>"No Users Here"</h3>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export function RandomUsersSimulation() {
    const randomUsers = useAppSelector((state) => state.users.randomUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <>
            <div id="customers">
                <table>
                    <thead>
                        <tr>
                            <th>dp</th>
                            <th>id</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {randomUsers.length ? (
                            randomUsers.map((user) => (
                                <tr key={user.id?.name}>
                                    <td>
                                        <img src={user.picture.medium} alt="" />
                                    </td>
                                    <td>{user.id?.name}</td>
                                    <td>
                                        {user.name?.first} {user.name?.last}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.dob?.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))
                        ) : (
                            <div className="center">
                                <h3>"No Users Here"</h3>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
