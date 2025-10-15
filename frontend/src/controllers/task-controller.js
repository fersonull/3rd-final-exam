class TaskController {
    constructor() {
        this.BASE_URL = import.meta.env.VITE_API_URL;
        this.tasks = [];
    }

    async testToken() {
        const response = await fetch(`${this.BASE_URL}/session`);

        console.log(response)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = response.json();


        return data;
    }

    async getTasks() {
        const response = await fetch(`${this.BASE_URL}/tasks`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }

    async createTask(task) {
        const response = await fetch(`${this.BASE_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async updateTask(task) {
        const response = await fetch(`${this.BASE_URL}/tasks/${task.id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }

    async deleteTask(id) {
        const response = await fetch(`${this.BASE_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    }
}

export default new TaskController();