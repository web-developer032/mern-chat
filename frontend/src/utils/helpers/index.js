
export const clearLocalStorage = () => {
    localStorage.clear()
}

export const getAccessToken = () => {
    localStorage.getItem("accessToken")
}

export const setAccessToken = (accessToken) => {
    localStorage.setItem("accessToken",accessToken)
}

