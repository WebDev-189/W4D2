import { useState, useEffect } from "react"
import axios from "axios"
import url from "./../service/api.js"
import { useNavigate, useParams } from "react-router-dom"

function UpdateOneProject() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const params = useParams()

	const navigate = useNavigate()

	const handleTitle = (event) => setTitle(event.target.value)
	const handleDescription = (event) => setDescription(event.target.value)

	useEffect(() => {
		axios
			.get(`${url}/projects/${params.projectId}`)
			.then((response) => {
				setTitle(response.data.title)
				setDescription(response.data.description)
			})
			.catch((e) => console.error(e))
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		const myProject = { title, description }

		try {
			/**
			 * Update project:
			 *
			 */

			const response = await axios.put(
				`${url}/projects/${params.projectId}`,
				myProject
			)
			console.log(response)
			navigate(`/projects/${params.projectId}`)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<h1>UpdateOneProject</h1>
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
		</div>
	)
}

export default UpdateOneProject
