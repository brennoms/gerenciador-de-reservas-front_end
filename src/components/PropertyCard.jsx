export default function PropertyCard({ property }) {
  return (
    <div className="dinamic-card flex column-center background-lightgray pad-1rem border-radius-1rem width20p">
      <img src={property.imageUrl} alt={property.name} className="width100p border-radius-1rem" />
      <h2>{property.name}</h2>
      <button>Ver Detalhes</button>
    </div>
  );
}
