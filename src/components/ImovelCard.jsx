export default function ImovelCard({ imovel }) {
  return (
    <div className="background-lightgray">
      <img src={imovel.imagem} alt={imovel.titulo} />
      <h2>{imovel.titulo}</h2>
      <p>{imovel.descricao}</p>
      <p>Preço: R$ {imovel.preco}</p>
      <button>Ver Detalhes</button>
    </div>
  );
}
