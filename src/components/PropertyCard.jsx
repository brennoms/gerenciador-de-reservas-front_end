export default function PropertyCard({ property }) {
  return (
    <div className="dinamic-card flex column-center background-lightgray border-radius-1rem width20p">
      <button className="button-card pad-1rem border-radius-1rem">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="width100p border-radius-1rem border-1rem"
        />
        <h2>{property.name}</h2>
      </button>
    </div>
  );
}
