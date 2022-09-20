import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProjectCard from '../ProjectCard'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {
    dataList: [],
    selected: categoriesList[0].id,
    phase: 'loading',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({phase: 'loading'})
    const {selected} = this.state
    try {
      const response = await fetch(
        `https://apis.ccbp.in/ps/projects?category=${selected}`,
      )
      const data = await response.json()
      const format = data.projects
      const result = format.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      if (response.ok === true) {
        this.setState({phase: 'success', dataList: result})
      } else {
        this.setState({phase: 'failure'})
      }
    } catch (e) {
      this.setState({phase: 'failure'})
    }
  }

  changeCategory = event => {
    this.setState(
      {
        selected: event.target.value,
      },
      this.getData,
    )
  }

  renderProjects = () => {
    const {phase} = this.state
    switch (phase) {
      case 'loading':
        return this.loadingProjects()
      case 'success':
        return this.successProjects()
      case 'failure':
        return this.failureProjects()
      default:
        return null
    }
  }

  loadingProjects = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color=" #328af2" width="80" />
    </div>
  )

  successProjects = () => {
    const {dataList} = this.state
    return (
      <ul className="project-list">
        {dataList.map(each => (
          <ProjectCard key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  failureProjects = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getData} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {selected} = this.state
    return (
      <div>
        <nav className="nav">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
          />
        </nav>
        <div className="container">
          <select
            className="select"
            onChange={this.changeCategory}
            value={selected}
          >
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          <div className="list-container">{this.renderProjects()}</div>
        </div>
      </div>
    )
  }
}

export default Projects
