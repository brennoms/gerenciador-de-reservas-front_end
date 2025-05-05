export default function PropertyCard({ property }) {
  return (
    <div className="flex column-center background-lightgray pad-1rem border-radius-1rem width20p">
      <img src={property.image} alt={property.name} />
      <h2>{property.name}</h2>
      <button>Ver Detalhes</button>
    </div>
  );
}
