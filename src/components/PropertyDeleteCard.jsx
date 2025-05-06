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
    <div className=" dinamic-card flex column-center background-lightgray pad-1rem border-radius-1rem">
      <img src={property.imageUrl} alt={property.name} className="width100p border-radius-1rem" />
      <h2>{property.name}</h2>
      <button className="button1" onClick={exclude}>
        Excluir
      </button>
    </div>
  );
}
