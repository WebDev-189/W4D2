import { useState, useEffect } from "react"
import axios from "axios"
import url from "./../service/api"
import { Link } from "react-router-dom"

function ProjectsPage() {
	const [projects, setProjects] = useState(null)

	async function fetchAllProjects() {
		try {
			const response = await axios.get(`${url}/projects`)
			setProjects(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchAllProjects()
	}, [])

	if (!projects) {
		return <p>Loadding....</p>
	}
	return (
		<>
			<h1>Projects Page</h1>
			<Link to={"/projects/create"}>Create a Project</Link>
			<div className="container">
				{projects.map((project) => {
					return (
						<article key={project.id}>
							<h2>
								<Link to={`/projects/${project.id}`}>{project.title}</Link>
							</h2>
						</article>
					)
				})}
			</div>
		</>
	)
}

export default ProjectsPage
