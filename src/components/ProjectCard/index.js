import './index.css'

const ProjectCard = props => {
  const {item} = props
  const {name, imageUrl} = item

  return (
    <li className="list-card">
      <img className="image" alt={name} src={imageUrl} />
      <div className="text-card">
        <p className="text">{name}</p>
      </div>
    </li>
  )
}

export default ProjectCard
