import { useNavigate, useLocation } from 'react-router-dom';

export default function PropertyCard({ property, className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const click = () => {
    navigate(`${location.pathname}/${property.id}`);
  };

  return (
    <div className={className ? `${className}` : 'w-fit'}>
      <button onClick={click} className="bg-gray-400 hover:bg-gray-500 shadow-md rounded">
        <img className="rounded" src={property.imageUrl} alt={property.name} />
        <h2 className="mb-1.5">{property.name}</h2>
      </button>
    </div>
  );
}
