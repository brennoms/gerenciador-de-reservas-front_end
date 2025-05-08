import { removeProperty } from '../services/propertiesService';
import { useAuth } from '../contexts/AuthContext';

export default function PropertyCard({ property, onDelete, className }) {
  const { token } = useAuth();

  function exclude() {
    removeProperty(property.id, token).then(res => {
      if (!res) {
        alert('não foi possivel remover o imovel');
      } else {
        onDelete();
      }
    });
  }

  return (
    <div className={className ? `${className}` : 'w-fit'}>
      <div className="flex flex-col items-center bg-gray-400 shadow-md rounded">
        <img src={property.imageUrl} alt={property.name} className="rounded" />
        <h2>{property.name}</h2>
        <button className="default-button mb-2 mt-1" onClick={exclude}>
          Excluir
        </button>
      </div>
    </div>
  );
}
