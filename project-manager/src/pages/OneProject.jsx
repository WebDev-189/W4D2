import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import TaskForm from "./../components/TaskForm"
import axios from "axios"
import url from "./../service/api.js"

function OneProject() {
	const [project, setProject] = useState(null)
	const [showForm, setShowForm] = useState(false)
	const { projectId } = useParams()

	const fetchOneProject = async () => {
		try {
			const response = await axios.get(
				`${url}/projects/${projectId}?_embed=tasks`
			)
			setProject(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchOneProject()
	}, [])

	const closeForm = () => setShowForm(false)

	/**
	 * Delete:
	 * Making a DELETE request toward a specific element
	 */
	const handleDelete = async (id) => {
		try {
			await axios.delete(`${url}/tasks/${id}`)
			fetchOneProject()
		} catch (error) {
			console.log(error)
		}
	}

	if (!project) {
		return <p>Loading...</p>
	}
	return (
		<div>
			<h1>OneProject</h1>

			<h2>{project.title}</h2>
			<p style={{ whiteSpace: "pre" }}>{project.description}</p>
			<Link to={`/projects/${projectId}/update`}>Update project</Link>

			<hr />
			{project.tasks.length > 0 && (
				<>
					<h3>Tasks</h3>

					<ol>
						{project.tasks.map((task) => {
							return (
								<li key={task.id}>
									<h4>
										{task.title}{" "}
										<span
											style={{ cursor: "pointer" }}
											onClick={() => handleDelete(task.id)}>
											🗑️
										</span>{" "}
									</h4>
									<p>{task.description}</p>
								</li>
							)
						})}
					</ol>
				</>
			)}
			<button onClick={() => setShowForm(!showForm)}> Add a task </button>

			{showForm && (
				<TaskForm
					projectId={Number(projectId)}
					closeForm={closeForm}
					fetchProject={fetchOneProject}
				/>
			)}
		</div>
	)
}

export default OneProject
