import axios from "axios";

//------------------------------------------------------- instances ----------------------------------------------------------

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    withCredentials: true,
})

export const instancePrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

//------------------------------------------------------- user -----------------------------------------------------------

export async function userSignUp(values) {
    console.log(values);
    try {
        const response = await instance.post('/user', values);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "An error occurred during signup");
        } else {
            throw new Error("An unknown error occurred during signup");
        }
    }
}

export async function userSignIn(values) {
    try {
        const response = await instance.post('/user/sign-in', values);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "An error occurred during signup");
        } else {
            throw new Error("An unknown error occurred during signup");
        }
    }
}

export async function userSignOut() {
    try {
        const response = await instance.post('/user/sign-out', {})
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "An error occurred during sign out");
        } else {
            throw new Error("An unknown error occurred during sign out");
        }
    }
}

export async function refreshToken() {
    try {
        const response = await instance.post('/user/refresh-token', {})
        console.log('Refresh token response:', response.data);
        return response.data.accessToken;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            throw new Error(error.response.data.message || "An error occurred during refresh token");
        } else {
            throw new Error("An unknown error occurred during refresh-token");
        }
    }
}

//------------------------------------------------------- tasks -----------------------------------------------------------

export async function getTasks() {
    try {
        const response = await instance.get('/task')
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while getting tasks")
    }
}

export async function getUserTasks(userId, status) {
    try {
        const response = await instance.get(`/task/${userId}`,
            { params: { status } }
        )
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while getting user tasks")
    }
}

export async function addTask(axiosPrivate, userId, userName, task) {
    try {
        const response = await axiosPrivate.post('/task', { userId, userName, task })
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while add task")
    }
}

export async function updateTaskContent({ taskId, updatedTask }) {
    try {
        const response = await instance.patch(`/task/${taskId}`, { updatedTask })
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while updating task")
    }
}

export async function updateTaskStatus({ taskId, taskStatus }) {
    console.log(taskStatus);

    try {
        const response = await instance.patch(`/task/${taskId}/status`, { taskStatus })
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while updating task status")
    }
}

export async function deleteTask(taskId) {
    try {
        const response = await instance.delete(`/task/${taskId}`)
        return response.data;
    } catch (error) {
        // console.error(error)
        throw new Error("error while deleting task")
    }
}
