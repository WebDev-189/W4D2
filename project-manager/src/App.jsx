import { Routes, Route } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import CreateProjectPage from "./pages/CreateProjectPage"
import OneProject from "./pages/OneProject"
import UpdateOneProject from "./pages/UpdateOneProject"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/projects">
					<Route index element={<ProjectsPage />} />
					<Route path="create" element={<CreateProjectPage />} />
					<Route path=":projectId" element={<OneProject />} />
					<Route path=":projectId/update" element={<UpdateOneProject />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
