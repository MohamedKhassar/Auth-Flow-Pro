interface CustomError extends Error {
    errors: Error
}
export const handelError = (err: any) => {
    let error: any = {}
    if (err.code == 11000) {
        if (err.message.includes('username')) {
            error["username"] = "username is duplicated"
        } else if (err.message.includes("email")) {
            error["email"] = "email is duplicated"

        }
    }
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach((value: any) => {
            error[value.path] = value.message
        })
    }
    return error
}