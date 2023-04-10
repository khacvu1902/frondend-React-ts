import { ISignup } from "../interfaces/signup"
import { IUser } from "../interfaces/user"
import instance from "./instance"

export const login = (user: IUser) => {
    return instance.post("/login", user)
}
export const signup = (signup: ISignup) => {
    return instance.post("/signup", signup)
}