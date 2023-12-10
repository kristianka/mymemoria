import { auth } from "../firebase";

const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

const createUserWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

const signOut = () => {
    return auth.signOut();
};

const getCurrentUser = () => {
    return auth.currentUser;
};

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getCurrentUser };
