import { removeProperty } from '../services/propertiesService';
import { useAuth } from '../contexts/AuthContext';

export default function PropertyCard({ property, onDelete }) {
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
    <div className="background-lightgray pad-1rem border-radius-1rem">
      <img src={property.image} alt={property.name} />
      <h2>{property.name}</h2>
      <button onClick={exclude}>Excluir</button>
    </div>
  );
}
