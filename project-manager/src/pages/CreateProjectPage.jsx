import { useState } from "react"
import axios from "axios"
import url from "./../service/api.js"
import { useNavigate } from "react-router-dom"
function CreateProjectPage() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	const navigate = useNavigate()

	const handleTitle = (event) => setTitle(event.target.value)
	const handleDescription = (event) => setDescription(event.target.value)

	const handleSubmit = async (event) => {
		event.preventDefault()
		const myProject = { title, description }

		try {
			const response = await axios.post(`${url}/projects`, myProject)
			navigate(`/projects/` + response.data.id)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<h1>CreateProjectPage</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input type="text" id="title" value={title} onChange={handleTitle} />
				</div>
				<div>
					<label htmlFor="description">Description: </label>

					<textarea
						name=""
						id="description"
						cols="30"
						rows="10"
						value={description}
						onChange={handleDescription}></textarea>
				</div>

				<button>Submit project</button>
			</form>
		</>
	)
}

export default CreateProjectPage
