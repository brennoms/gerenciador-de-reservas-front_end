export default function PropertyCard({ property }) {
  return (
    <div className="background-lightgray">
      <img src={property.image} alt={property.name} />
      <h2>{property.name}</h2>
      <button>Ver Detalhes</button>
    </div>
  );
}
