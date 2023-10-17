import { useState } from "react"
import axios from "axios"
import url from "./../service/api.js"

/**
 * A task is :
 * {
 * id: Number (automatically generated)
 * projectId: Number
 * title: String,
 * description: String
 * }
 */

const initialValues = { title: "", description: "" }

function TaskForm({ projectId, closeForm, fetchProject }) {
	const [formData, setFormData] = useState(initialValues)

	const handleChange = (event) => {
		const key = event.target.name
		const value = event.target.value
		setFormData({ ...formData, [key]: value })
	}

	async function handleSubmit(event) {
		event.preventDefault()

		try {
			// const oneTask = {
			//   title: formData.title,
			//   description: formData.description,
			//   projectId: projectId
			// }
			const oneTask = { ...formData, projectId }

			const response = await axios.post(`${url}/tasks`, oneTask)
			console.log(response)
			setFormData(initialValues)
			closeForm()
			fetchProject()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>New task</legend>
				<div>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="description">Description: </label>
					<input
						type="text"
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<button>Create Task</button>
			</fieldset>
		</form>
	)
}

export default TaskForm
